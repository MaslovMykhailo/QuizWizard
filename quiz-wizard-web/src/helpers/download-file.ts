export const downloadFile = (
  filename: string,
  href: string
) => {
  fetch(href).then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement('a')

      link.setAttribute('href', URL.createObjectURL(blob))
      link.setAttribute('download', filename)
      link.setAttribute('target', '_blank')

      link.style.display = 'none'
      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
    })
    .catch(console.warn)
}
