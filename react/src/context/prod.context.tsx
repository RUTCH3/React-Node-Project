import { createContext } from "react";
import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

type ProdContextType = {
    getProdById: (id: number) => Producer | undefined,
    updateProducer: (id: number, newProducer: Producer) => void;
    addProducer: (newProducer: Producer) => void;
};

export const ProdContext = createContext<Partial<ProdContextType>>({});

export const ProducerProvider = (props: any) => {
    const { data: producers, error, loading, request } = useHttp<Producer[]>('/producer/1');

    const contextValue: ProdContextType = {
        getProdById(id) {
            let result: Producer = { id: 100, name: "", phone: "", email: "", description: "" };
            request(id).then(data => console.log(data));
            return result;
        },
        addProducer(newProducer) {
            request(newProducer);
        },
        updateProducer(id, newProducer) {
            const id2 = producers?.find(e => e.id = id);
            console.log(id2);
            request(newProducer);
        }
    };

    return <ProdContext.Provider value={contextValue}>
        {loading && 'Loading...'}
        {error}
        {!loading && !error && props.children}
    </ProdContext.Provider>



    // const queryClient = useQueryClient();
    // const producerId = 1;

    // // **1️⃣ שליפת מפיק לפי ID (GET)**
    // const { data: producer, error, isLoading } = useQuery({
    //     queryKey: ["producer", producerId],
    //     queryFn: () => getProducer(producerId), // ✅ שימוש בפונקציה מה-API
    // });

    // // **2️⃣ עדכון מפיק (PUT)**
    // const updateMutation = useMutation({
    //     mutationFn: (updatedProducer: Producer) => updateProducer(producerId, updatedProducer), // ✅ שימוש בפונקציה מה-API
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["producer", producerId] }); // רענון הנתונים
    //     },
    // });

    // // **3️⃣ הוספת מפיק חדש (POST)**
    // const addMutation = useMutation({
    //     mutationFn: (newProducer: Producer) => addProducer(newProducer), // ✅ שימוש בפונקציה מה-API
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["producers"] }); // רענון הנתונים
    //     },
    // });

    // const contextValue: ProdContextType = {
    //     producer,
    //     updateProducer: (id, newProducer) => updateMutation.mutate(newProducer),
    //     addProducer: (newProducer) => addMutation.mutate(newProducer),
    // };

    // return (
    //     <ProdContext.Provider value={contextValue}>
    //         {isLoading && <p>Loading...</p>}
    //         {error && <p>Error loading producer</p>}
    //         {!isLoading && !error && props.children}
    //     </ProdContext.Provider>
    // );
};
