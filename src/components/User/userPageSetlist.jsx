import { useContext } from "react";
import { AuthContext, supabase } from "../../contexts/authContext";

export default function UserPageSetlist({dbData, getItems}) {

    const { session } = useContext(AuthContext);

    async function deleteSetlist() {
        
        const response = await supabase
            .from('setlists')
            .delete()
            .eq('url', dbData.url);

        if (response.error) console.log(response.error);

        await supabase.storage
            .from('setlists')
            .remove([`${session.user.id}/${dbData.url}.json`]);

        getItems();

    }
    
    return(

        <div>
            <div>{dbData.name}</div>
            <div>{dbData.description}</div>
            <div>{dbData.url}</div>
            <button onClick={deleteSetlist}>Delet</button>
        </div>

    )

}