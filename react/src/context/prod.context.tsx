import { createContext } from "react";
import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

type ProdContextType = {
    producers: Producer[] | undefined,
    getProdById: (email: string) => Producer | null | undefined,//Producer | null,
    updateProducer: (id: number, newProducer: Producer) => void;
    addProducer: (newProducer: Producer) => void;
};

export const ProdContext = createContext<Partial<ProdContextType>>({});

export const ProducerProvider = (props: any) => {
    const { data: producers, error, loading, request } = useHttp<Producer[]>("/producer", 'get');

    const contextValue: ProdContextType = {
        producers,
        getProdById(email: string) {
            return producers?.find(e => e.email === email);
        },
        async addProducer(newProducer) {
            await request(newProducer);
        },
        async updateProducer(id, newProducer) {
            const id2 = producers?.find(e => e.id = id);
            console.log(id2);
            await request(newProducer, `${id}`);
        }
    };

    return <ProdContext.Provider value={contextValue}>
        {loading && 'Loading...'}
        {error}
        {!loading && !error && props.children}
    </ProdContext.Provider>
};
