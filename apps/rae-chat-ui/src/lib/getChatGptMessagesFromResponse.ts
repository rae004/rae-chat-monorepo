const getChatGptMessagesFromResponse = (response: any) => {
    const results = [];

    for (const choice of response.data.choices) {
        results.push(choice.message);
        console.log('our message: ', choice);
    }

    return results;
};

export default getChatGptMessagesFromResponse;
