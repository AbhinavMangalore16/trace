import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator"

export function generateCascadeSlug(): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    style: "lowerCase",
  })
}
