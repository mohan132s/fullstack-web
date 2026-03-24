import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { contactRouter } from './routes/contact';
import { resumeRouter } from './routes/resume';
import { projectsRouter } from './routes/projects';

const app = express();
const PORT = process.env.PORT ?? 4000;

// ── Security middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json({ limit: '16kb' }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/v1/contact', contactRouter);
app.use('/v1/resume', resumeRouter);
app.use('/v1/projects', projectsRouter);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[error]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});

export default app;
