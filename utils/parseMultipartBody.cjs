/**
 * @param {import('@fastify/multipart').MultipartFields} body
 */
const parseMultipartBody = (body) => {
  const parsedBody = {}

  for (const [key, value] of Object.entries(body)) {
    if (value === undefined) continue
    if (Array.isArray(value)) continue // TODO: implement array parsing
    if (value.type === 'file') {
      parsedBody[key] = {
        filename: value.filename,
        encoding: value.encoding,
        mimetype: value.mimetype,
        fields: value.fields || parseMultipartBody(value.fields),
      }
      continue
    }
    if (value.type === 'field') {
      parsedBody[key] = value.value
    }
  }

  return parsedBody
}

module.exports = parseMultipartBody
