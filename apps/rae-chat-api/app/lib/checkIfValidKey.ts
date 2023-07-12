const checkIfValidKey = async (
    key: string,
    email: string,
): Promise<boolean> => {
    // add route in user service to return if key is valid.
    console.log('our key: ', key.length);
    return key.length > 6;
};

export default checkIfValidKey;
