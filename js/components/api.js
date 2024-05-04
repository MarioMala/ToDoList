/** @format */

export const getData = async URL => {
	try {
		const res = await fetch(URL);
		if (!res.ok) {
			throw new Error(`Nieprawidłowa odpowiedź serwera: (${res.status} ${res.statusText})`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Wystąpił błąd podczas ładowania danych:', error);
		return [];
	}
};
