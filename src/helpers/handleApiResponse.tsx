function handleApiResponse(response:any) {
    if (!response || !response.data) {
        // Si no hay datos en la respuesta, retorna un error genérico
        return { error: 'Error en la respuesta del servidor' };
    }

    // Verifica si hay errores en la respuesta
    if (response.data.errors) {
        const errorMessages = Object.keys(response.data.errors).map(key => <li key={key}>{`${response.data.errors[key]}`}</li>);
        return errorMessages
       
    } else if (response.data.mensaje) {
        return response.data.mensaje
    } else {
        return response.data ;
    }
}

export{handleApiResponse}