import "server-only";

import { LangType } from "@/lib/types";

const dictionaries = {
	de: () =>
		import("@/lib/dictionaries/de.json").then((module) => module.default),
	es: () =>
		import("@/lib/dictionaries/es.json").then((module) => module.default),
	fr: () =>
		import("@/lib/dictionaries/fr.json").then((module) => module.default),
	en: () =>
		import("@/lib/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: LangType) => dictionaries[locale]();
