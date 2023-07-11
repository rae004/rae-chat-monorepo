const checkIfValidKey = async (
    key: string,
): Promise<boolean> => {
    // add route in user service to return if key is valid.

    return key.length > 6;
};

export default checkIfValidKey;
