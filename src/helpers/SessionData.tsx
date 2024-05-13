const SessionData = () => {
    try {

        const sessionData:IModelLoginRequest | undefined = JSON.parse(sessionStorage.getItem("sessionUser") as string) as IModelLoginRequest      

        if (!sessionData) {
            return null
        }

        return sessionData;
    } catch {
        return null;
    }
}

export { SessionData };