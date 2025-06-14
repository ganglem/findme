FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]