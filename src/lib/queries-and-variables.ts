export const cityIdQuery = `query GetAllCities {
  allCities {
    id
    name
  }
}`;

export const placeIdQuery = `
        query GetPlaceId($filter: PlaceModelFilter) {
          allPlaces(filter: $filter) {
            id
            name
          }
        }
      `;
export const citiesInCountryQuery = `query GetCitiesInCountry($filter: CityModelFilter) {
      allCities(filter: $filter) {
        id
        name
      }
    }
  `;

export const placesInCityQuery = `query AllPlaces($filter: PlaceModelFilter, $orderBy: PlaceModelOrderBy, $first: IntType, $skip: IntType) {
          allPlaces(filter: $filter, orderBy: [$orderBy], first: $first, skip: $skip) {
            id
            name
            description
            images {
              url
              alt
              title
            }
            city {
              id
              name
            }
            placeCategory {
              name
              key
            }
            location {
              latitude
              longitude
            }
          }
          _allPlacesMeta(filter: $filter) {
            count
          }
        }`;
export const PlacesInCityByAcitivitiesQuery = ``;
export const CitiesInCountryQuery = ``;
