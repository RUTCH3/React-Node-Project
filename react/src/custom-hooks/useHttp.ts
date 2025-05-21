import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const serverInstance = axios.create({
    baseURL: 'http://localhost:8000',
})

export const useHttp = <T>(url: string, method: HttpMethod = 'get') => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<T>();

    // פונקציה בשביל לבצע קריאות שרת בפועל. הפונקציה מקבלת
    // url - כתובת הקריאה
    // סוג הקריאה, וגוף הקריאה - אופציונאלי כי יש אותו רק בקריאות post / put
    const request = useCallback(async (body?: any, id: string = '') => {
        setLoading(true);
        setError('');
        try {
            const result = await serverInstance[method]<T>(`${url}/${id}`, body);
            console.log(result.data);
            setLoading(false);
            setData(result.data as T);
        } catch (error) {
            setError('error accoures try again later');
            setLoading(false);
            console.log('error while fetching', error);
        }
    }, [])

    useEffect(() => {
        if (method === 'get') {
            request('/');
        }
    }, []);

    return { loading, error, data, request };
}