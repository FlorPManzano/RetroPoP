import { APIUrl } from "../config";

export default async function fetchData(route, method, data) {
    const response = await fetch(`${APIUrl}/${route}`, {
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
