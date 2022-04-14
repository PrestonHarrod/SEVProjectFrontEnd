import { apiClient } from "./apiClient.js";

export default {
    sendMessage(user) {
        return apiClient.post("sms/sendMessage", user);
    },
};
