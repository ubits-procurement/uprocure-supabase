enum CustomForm {
    Colombia = 554,
    Peru = 537,
    Mexico = 536,
    Chile = 579,
}

export function getCustomFormByCountry(
    country: keyof typeof CustomForm,
): number {
    return CustomForm[country] || 50;
}
