$$ Prisma Setup$$

1. **Install dependencies**
```bash
   npm install @prisma/client @prisma/adapter-mariadb
   npm install -D prisma
```

2. **Initialize Prisma**
```bash
   npx prisma init
```

3. **Configure `prisma.config.ts`** with your database URL:
```ts
import path from "node:path";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schemas"),
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

4. **Define your models** in `prisma/schema.prisma`

5. **Run migrations**
```bash
   npx prisma migrate dev --name init
```

6. **Generate the client**
```bash
   npx prisma generate
```

7. **Reset database** (when needed)
```bash
   npx prisma migrate reset
```