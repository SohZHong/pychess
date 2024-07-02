import html2canvas from 'html2canvas'

export const downloadScreenshot = async (elementRef: HTMLElement, format: string, screenshotName: string) => {
  try {
    const canvas = await html2canvas(elementRef)
    const dataUrl = canvas.toDataURL(format)

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = screenshotName
    link.click()
  } catch (error) {
    console.error('Error generating image:', error)
  }
}
