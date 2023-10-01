export default async function fetchData(route, method, data) {
    const response = await fetch(`http://localhost:3000/${route}`, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();

    return json;
}
