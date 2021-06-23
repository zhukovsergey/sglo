const scripts = {
  translite (h1) {
    const ru = {
      1: '1',
      2: '2',
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'e',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'j',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: 'sh',
      ъ: '-',
      ы: 'y',
      ь: '-',
      э: 'e',
      ю: 'yu',
      я: 'ya'
    }
    const nStr = []
    const str = h1
      .replace(/[ъь]+/g, '')
      .replace(/й/g, 'i')
      .replace(/- /g, '')
      .replace(/ -/g, '')
      .replace(/[ _.,!?№&;:#%()*"'«»]/g, '-')
    for (let i = 0; i < str.length; i++) {
      nStr.push(
        ru[str[i]] ||
        (ru[str[i].toLowerCase()] === undefined && str[i]) ||
        ru[str[i].toLowerCase()].replace(/^(.)/, function (match) {
          return match
        })
      )
    }
    return nStr.join('').toLowerCase()
  }
}
export default scripts
