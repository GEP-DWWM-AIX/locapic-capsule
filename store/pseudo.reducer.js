export default function (pseudo = '', action) {
    if (action.type === 'savePseudo') {
        const newPseudo = action.pseudo
        console.log(action.pseudo)
        return newPseudo
    } else {
        return pseudo
    }
}