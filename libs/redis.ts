import Redis from "ioredis";

export interface INoteItem {
  title: string;
  content: string;
  updateTime: string;
}

const redis = new Redis();

const initialData = {
  "1722503490941":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2024-08-01T17:12:48.837Z"}',
  "1722503507832":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2024-08-01T17:13:48.837Z"}',
  "1722503514752":
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2024-08-01T17:14:48.837Z"}',
};

export async function getAllNotes() {
  const notes = await redis.hgetall("notes");

  if (Object.keys(notes).length === 0) {
    await redis.hset("notes", initialData);
  }

  return await redis.hgetall("notes");
}

export async function addNote(data: string) {
  const uuid = Date.now().toString();
  // @ts-ignore
  await redis.hset("notes", [uuid], data);

  return uuid;
}

export async function updateNote(uuid: string, data: string) {
  // @ts-ignore
  await redis.hset("notes", [uuid], data);
}

export async function getNote(uuid: string) {
  const note = (await redis.hget("notes", uuid)) || "";

  return JSON.parse(note);
}

export async function deleteNote(uuid: string) {
  return redis.hdel("notes", uuid);
}

export async function addUser(username: string, password: string) {
  // @ts-ignore
  await redis.hset("users", [username], password);

  return {
    name: username,
    username,
  };
}

export async function getUser(username: string, password: string) {
  const passwordFromDB = await redis.hget("users", username);

  if (!passwordFromDB) return 0;

  if (passwordFromDB !== password) return 1;

  return {
    name: username,
    username,
  };
}

export default redis;
