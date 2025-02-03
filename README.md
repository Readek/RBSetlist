# RBSetlist

A project for Rock Band event organizers that allows uploading setlists to then be shared to users.

Event organizers can use the project to upload setlists, both entirely locally or uploading them to a database to later be shared. Setlists can be generated thanks to Nemo's [Nautilus](https://github.com/trojannemo/Nautilus), using Setlist Manager and exporting the setlist as `.json`.

Regular users can use urls shared by event organizers to see an event's setlist, being able to sort the setlist, filter it, and also being able to search for songs, artists and albums via text query. Users are also able to see song information, like for example, instruments available on a song.

You can go check out the project right now at its [Github Page](https://readek.github.io/RBSetlist).

## Previews

Coming soon...

---

This project uses React with Vite, and also uses Supabase to connect to a database hosting user's setlists. If you're a developer and you want to run this yourself, clone this repo and run:

```
npm install
```

You will then be able to run a developer enviroment with:

```
npm run dev
```

Note that you will be required to provide your own Supabase Prokect ID and API keys on a `.env` file:

```
VITE_SUPABASE_PROJECT_ID = {{your_project_id}}
VITE_SUPABASE_API_KEY = {{your_api_key}}
```

However, I've made sure it all can run locally without its Supabase implementation, in case you just want to use the Setlist view.
