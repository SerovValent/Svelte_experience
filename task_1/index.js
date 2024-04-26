import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)


function decryptFields(data, translations) {
    const result = data.map(item => {
        const decryptItem={};
        for (const key in item){
            if (key.endsWith('Id') && (translations.hasOwnProperty(item[key]) || item[key] === "0") && key !== "groupId") {
                decryptItem[key] = translations[item[key]]
            } else {decryptItem[key] = item[key];
            }
        }
        return decryptItem
    })
    return result
}

const decode = decryptFields(encoded, translations)
console.log(decode)
//не совсем понял по какому критерию id должны быть уникальны, если речь о тех что не имеют своего перевода то
const uniqueId = (encoded, translations)=>{
    const arrId = encoded.map(item=>{
        const uniqItem = {}
        for(const key in item){
            if(key.endsWith('Id') && item[key]!==null){
                uniqItem[key] = item[key]
            }
        }
        return uniqItem
    })
    const uniqueIds = [...new Set(arrId.flatMap(item => Object.values(item)))];
    const finId = uniqueIds.filter(id => !translations.hasOwnProperty(id));

    return finId
}

const id = uniqueId(encoded,translations)
console.log(id)




