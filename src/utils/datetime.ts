export const getCurrentTimestamp = (): number => new Date().getTime() / 1000;
export const formatDate = (dateString: string | undefined): string => {
    if (dateString) {
        const date = new Date(dateString);
        const now = new Date();
        let daysPassed = Math.round((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
        let time = date.toLocaleTimeString('ru-RU', { hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, minute: '2-digit', hour: '2-digit' });
        let iGmt = -(now.getTimezoneOffset() / 60);
        let gmtString = `i-GMT${iGmt >= 0 ? '+' : ' '}${iGmt}`;
        if (daysPassed === 0) {
            return `Сегодня, ${time} ${gmtString}`;
        }
        if (daysPassed === 1) {
            return `Вчера, ${time} ${gmtString}`;
        }
        return `Прошло ${daysPassed} дней, ${time} ${gmtString}`;
    }
    return '';
}
