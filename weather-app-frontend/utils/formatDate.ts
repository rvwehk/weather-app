export const formatDate = (date: number, type?: string) => {
    const dt = new Date(date * 1000);
    let formattedDate = ''
    if (type == 'day') {
        formattedDate = dt.toLocaleDateString('fr-FR', {
            weekday: 'long',
        }).replace(',', '');
    } else if (type == 'date-month') {
        formattedDate = dt.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
        }).replace(',', '');
    } else {
        formattedDate = dt.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
        }).replace(',', '');
    }
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}