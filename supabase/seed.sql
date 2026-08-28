-- ========================================================================
-- CareerOS: Initial Database Seed Data (Global Syllabi & Default Topics)
-- ========================================================================

-- 1. Seed Global DSA Topics
insert into public.dsa_topics (name, category, order_index) values
('Arrays & Hashing', 'Data Structures', 1),
('Two Pointers', 'Algorithms', 2),
('Sliding Window', 'Algorithms', 3),
('Stack & Monotonic Stack', 'Data Structures', 4),
('Binary Search', 'Algorithms', 5),
('Linked Lists', 'Data Structures', 6),
('Binary Trees & BST', 'Data Structures', 7),
('Tries', 'Data Structures', 8),
('Heap / Priority Queue', 'Data Structures', 9),
('Backtracking', 'Algorithms', 10),
('Graphs & BFS/DFS', 'Algorithms', 11),
('Advanced Graphs (Dijkstra, Prim)', 'Algorithms', 12),
('1-D Dynamic Programming', 'Algorithms', 13),
('2-D Dynamic Programming', 'Algorithms', 14),
('Greedy Algorithms', 'Algorithms', 15),
('Bit Manipulation & Math', 'Algorithms', 16)
on conflict do nothing;


-- 2. Seed Web Development Track
do $$
declare
  webdev_id uuid := gen_random_uuid();
  corecs_os_id uuid := gen_random_uuid();
  corecs_dbms_id uuid := gen_random_uuid();
  corecs_cn_id uuid := gen_random_uuid();
  corecs_sd_id uuid := gen_random_uuid();
begin
  -- Web Dev Track
  insert into public.curriculum_tracks (id, title, category, icon, color, description)
  values (webdev_id, 'Full-Stack Web Development', 'Skill Track', 'Code2', 'cyan', 'Complete modern web engineering from frontend to scalable APIs.');

  insert into public.curriculum_items (track_id, user_id, title, description, status, order_index) values
  (webdev_id, '00000000-0000-0000-0000-000000000000', 'HTML5 Semantic Tags & Forms', 'Semantic elements, ARIA accessibility, FormData API', 'Not Started', 1),
  (webdev_id, '00000000-0000-0000-0000-000000000000', 'CSS3 Flexbox, Grid & Tailwind', 'Responsive layouts, grid auto-fit, utility-first design systems', 'Not Started', 2),
  (webdev_id, '00000000-0000-0000-0000-000000000000', 'JavaScript ES6+ & Async/Await', 'Closures, Event Loop, Promises, Fetch API, DOM manipulation', 'Not Started', 3),
  (webdev_id, '00000000-0000-0000-0000-000000000000', 'React.js Component Architecture', 'Hooks (useState, useEffect, useMemo), Custom Hooks, Context', 'Not Started', 4),
  (webdev_id, '00000000-0000-0000-0000-000000000000', 'State Management & TanStack Query', 'Zustand store slices, server cache synchronization, optimistic UI', 'Not Started', 5),
  (webdev_id, '00000000-0000-0000-0000-000000000000', 'Node.js & Express REST APIs', 'Routing, middleware, JWT authentication, rate limiting', 'Not Started', 6),
  (webdev_id, '00000000-0000-0000-0000-000000000000', 'PostgreSQL & Database Design', 'Schema design, indexing, transactions, Supabase integration', 'Not Started', 7);

  -- Core CS: Operating Systems
  insert into public.curriculum_tracks (id, title, category, icon, color, description)
  values (corecs_os_id, 'Operating Systems', 'Core CS', 'Cpu', 'purple', 'Concurrency, memory management, scheduling, and system calls.');

  insert into public.curriculum_items (track_id, user_id, title, description, status, order_index) values
  (corecs_os_id, '00000000-0000-0000-0000-000000000000', 'Process vs Thread & Concurrency', 'Process Control Block, Context Switching, Multi-threading', 'Not Started', 1),
  (corecs_os_id, '00000000-0000-0000-0000-000000000000', 'CPU Scheduling Algorithms', 'FCFS, SJF, Round Robin, Priority Scheduling', 'Not Started', 2),
  (corecs_os_id, '00000000-0000-0000-0000-000000000000', 'Deadlocks & Synchronization', 'Mutex, Semaphores, Banker Algorithm, Resource Allocation Graph', 'Not Started', 3),
  (corecs_os_id, '00000000-0000-0000-0000-000000000000', 'Virtual Memory & Paging', 'Page Replacement (LRU, FIFO), Thrashing, TLB', 'Not Started', 4);

  -- Core CS: DBMS
  insert into public.curriculum_tracks (id, title, category, icon, color, description)
  values (corecs_dbms_id, 'Database Management Systems', 'Core CS', 'Database', 'blue', 'Relational theory, ACID transactions, and query optimization.');

  insert into public.curriculum_items (track_id, user_id, title, description, status, order_index) values
  (corecs_dbms_id, '00000000-0000-0000-0000-000000000000', 'Relational Algebra & Normalization', '1NF, 2NF, 3NF, BCNF, Functional Dependencies', 'Not Started', 1),
  (corecs_dbms_id, '00000000-0000-0000-0000-000000000000', 'ACID Properties & Transactions', 'Atomicity, Consistency, Isolation Levels, Durability, WAL', 'Not Started', 2),
  (corecs_dbms_id, '00000000-0000-0000-0000-000000000000', 'Indexing & B/B+ Trees', 'Clustered vs Non-clustered, Query Execution Plans, Scans', 'Not Started', 3),
  (corecs_dbms_id, '00000000-0000-0000-0000-000000000000', 'Concurrency Control & Locking', '2-Phase Locking (2PL), Deadlock Detection, MVCC', 'Not Started', 4);

  -- Core CS: Computer Networks
  insert into public.curriculum_tracks (id, title, category, icon, color, description)
  values (corecs_cn_id, 'Computer Networks', 'Core CS', 'Network', 'emerald', 'Protocols, routing, network layers, and internet architecture.');

  insert into public.curriculum_items (track_id, user_id, title, description, status, order_index) values
  (corecs_cn_id, '00000000-0000-0000-0000-000000000000', 'OSI 7-Layer & TCP/IP Stack', 'Layer responsibilities, packet encapsulation, framing', 'Not Started', 1),
  (corecs_cn_id, '00000000-0000-0000-0000-000000000000', 'TCP vs UDP & 3-Way Handshake', 'Flow control, Congestion control, SYN/ACK, TCP termination', 'Not Started', 2),
  (corecs_cn_id, '00000000-0000-0000-0000-000000000000', 'HTTP/1.1 vs HTTP/2 vs HTTP/3', 'Multiplexing, Head-of-line blocking, QUIC, HTTPS/TLS', 'Not Started', 3),
  (corecs_cn_id, '00000000-0000-0000-0000-000000000000', 'DNS Resolution & Routing', 'Root servers, authoritative DNS, CDN edge caching', 'Not Started', 4);

  -- Core CS: System Design Fundamentals
  insert into public.curriculum_tracks (id, title, category, icon, color, description)
  values (corecs_sd_id, 'System Design Fundamentals', 'Core CS', 'Layers', 'amber', 'Architecting distributed, highly available, fault-tolerant systems.');

  insert into public.curriculum_items (track_id, user_id, title, description, status, order_index) values
  (corecs_sd_id, '00000000-0000-0000-0000-000000000000', 'Horizontal vs Vertical Scaling', 'Stateless services, Load balancing strategies (Round Robin, Least Conn)', 'Not Started', 1),
  (corecs_sd_id, '00000000-0000-0000-0000-000000000000', 'Caching Strategies (Redis & CDN)', 'Cache-aside, Write-through, Write-back, Cache invalidation', 'Not Started', 2),
  (corecs_sd_id, '00000000-0000-0000-0000-000000000000', 'Database Sharding & Replication', 'Master-Replica, Partitioning keys, Consistent Hashing', 'Not Started', 3),
  (corecs_sd_id, '00000000-0000-0000-0000-000000000000', 'CAP Theorem & PACELC', 'Consistency vs Availability vs Partition tolerance trade-offs', 'Not Started', 4),
  (corecs_sd_id, '00000000-0000-0000-0000-000000000000', 'Message Queues & Event-Driven Systems', 'Asynchronous processing, Kafka, RabbitMQ, Idempotency', 'Not Started', 5);
end $$;
