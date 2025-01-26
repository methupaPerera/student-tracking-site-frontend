import { getToken } from "./utils";

type HttpMethod =
	| "GET"
	| "POST"
	| "PUT"
	| "DELETE"
	| "PATCH"
	| "HEAD"
	| "OPTIONS";

interface fetchOptions extends RequestInit {
	method?: HttpMethod;
	body?: any;
	headers?: Record<string, string>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function makeFetch(
	url: string,
	options: fetchOptions = {}
) {
	const { method = "GET" } = options;

	url = apiUrl + url;

	const defaultHeaders: Record<string, string> = {
		"Content-Type": "application/json",
	};

	const token = getToken();

	if (token) {
		defaultHeaders.authorization = token;
	}

	const fetchOptions: RequestInit = {
		method,
		headers: defaultHeaders,
	};

	if (method !== "GET" && method !== "HEAD" && options?.body) {
		fetchOptions.body = options.body;
	}

	const response = await fetch(url, fetchOptions);

	return response;
}