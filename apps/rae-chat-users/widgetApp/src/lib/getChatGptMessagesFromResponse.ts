const getChatGptMessagesFromResponse = (response: any) => {
    const results = [];

    for (const choice of response.data.choices) {
        results.push(choice.message);
    }

    return results;
};

export default getChatGptMessagesFromResponse;
