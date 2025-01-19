import { convertToCoreMessages, Message, streamText, tool } from "ai";
import { z } from "zod";
import { geminiProModel } from "@/ai";
import { getPlaces, getPlacesInACountry } from "@/ai/actions";
import { activities } from "@/lib/constants";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0
  );

  const result = await streamText({
    model: geminiProModel,
    system: `\n
    - you help users plan their trips
    - reply in whichever language they're prompting
    - here's the optimal flow
      - ask for the city or country they want to visit
      - ask for the duration of the trip
      - show places the user can visit in that city or the cities user wants to visit in that duration (reduce the number of places to fit the duration).
      - suggest activities to explore. Here are these ${activities}. Do not add activities on your own. Always use the provided activities.
      - display the summary of the places they've chosen
    - keep your responses limited to a sentence.
    - DO NOT output lists.
        - after every tool call, pretend you're showing the result to the user and keep your response limited to a phrase.
        - today's date is ${new Date().toLocaleDateString()}.
        - ask follow up questions to nudge user into the optimal flow
        - if any tool returns an id, make sure you remember it, this can be used to send to the tools. Ex: When cities are returned they have as well, these IDs can be used to search for places in the city with that id.
        - when ask for planning a ticket, utilize all these tools to make a trip, ask for relevant questions if required, like flights, hotels/stays, type of activities they wanna do, etc.
        - make sure to match the relevant names when giving the arguments, like if the user typed 'parise' instead of paris or barcelona instead of Barcelona, send the correct name as the argument to the tools.
        - while passing argument if the name is more than a letter long format it like this: arts and culture -> arts-and-culture, united states -> united-states. Also convert them to lowercase as well.
        - intelligently guess if it is a city or a country or a place or activity and then use the right tool for the job.
        - 
        `,
    messages: coreMessages,
    tools: {
      getPlacesInACity: {
        description: "Get places to visit in a city. Optionally filter by activities.",
        parameters: z.object({
          cityName: z.string().describe("Name of the city"),
          cityId: z.string().describe("Id of the city").optional(),
          activityName: z.string().describe("Activities user can do.").optional(),
        }),
        execute: async ({ cityName, cityId, activityName }) => {
          const places = await getPlaces(cityName, cityId, activityName);
          return places;
        },
      },
      getPlacesInACountry: {
        description: "Get places to visit in a country. Optionally filter by activities.",
        parameters: z.object({
          countryName: z.string().describe("Name of the country"),
          countryId: z.string().describe("Id of the country").optional(),
          activityName: z.string().describe("Activities user can do.").optional(),
        }),
        execute: async ({ countryName, countryId, activityName }) => {
          const places = await getPlacesInACountry(countryName, countryId, activityName);
          return places;
        },
        // getFlights:  {}
        // getHotels:  {}
      },
    },
    // on finish, save chat
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    }
  })

  return result.toDataStreamResponse();
}
