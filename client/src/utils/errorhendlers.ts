// utils/errorHandler.js

export const getApiErrorMessage = (error: any) => {
	if (!error.response) {
		return "Network error. Please check your internet connection.";
	}

	const { status, data } = error.response;

	switch (status) {
		case 400:
			return data?.message || "Invalid request.";

		case 401:
			return data?.message || "Please login again.";

		case 403:
			return data?.message || "You don't have permission.";

		case 404:
			return data?.message || "Resource not found.";

		case 409:
			return data?.message || "Conflict occurred.";

		case 422:
			return data?.message || "Please check the entered data.";

		case 500:
			return "Something went wrong on the server.";

		default:
			return data?.message || "Something went wrong.";
	}
};