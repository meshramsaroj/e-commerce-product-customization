
const isRequireDataMissing = (fields) => {
    return fields.some(field => field.trim() === "")
}


export {
    isRequireDataMissing
}