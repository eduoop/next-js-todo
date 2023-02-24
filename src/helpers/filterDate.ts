export const FilterDate = (dateFull: string) => {
    const date = dateFull.split("T")[0]
    const hour = dateFull.split("T")[1]

    const newDate = `${date.split("-")[0]}/${date.split("-")[1]}/${date.split("-")[2]}`
    const newHour = `${hour.split(":")[0]}:${hour.split(":")[1]}`
    return `${newDate} ás ${newHour}`
}