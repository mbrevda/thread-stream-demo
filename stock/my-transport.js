export default async function () {
  const { default: build } = await import('pino-abstract-transport')
  return build(function (source) {
    source.on('data', function (obj) {
      console.log(JSON.stringify(obj))
    })
    return source
  })
}
