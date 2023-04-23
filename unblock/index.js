const BACKEND_URL = "http://ec2-54-177-39-50.us-west-1.compute.amazonaws.com:3000/";

class UnblockError extends Error {
    constructor(message) {
        super(message)
    }
}

export async function processLockResponse (userToken, lockRequest, lockResponse) {
    console.log(lockRequest, lockRequest);
    if (!(
        lockRequest.uid === lockResponse.uid &&
        lockRequest.lid === lockResponse.lid &&
        lockRequest.rid === lockResponse.rid &&
        lockRequest.type === lockResponse.type &&
        lockResponse.nonce
    )) {
        return; // Drop bad lock response
    }

    const response = await fetch(BACKEND_URL + "sign", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(lockResponse)
    });

    const body = await response.json();
    return body;
}