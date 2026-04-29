/**
 * Seed Data for Blog
 * 
 * This file contains sample blog posts that can be used to seed the database.
 * Run this script after setting up MongoDB connection.
 * 
 * Usage:
 * 1. Set your MONGODB_URI and ADMIN_API_KEY in .env.local
 * 2. Start the dev server: npm run dev
 * 3. Use the API endpoint to create posts:
 * 
 * curl -X POST http://localhost:3000/api/blogs/create \
 *   -H "Content-Type: application/json" \
 *   -H "x-api-key: your-secret-api-key-here" \
 *   -d '{
 *     "title": "Your Blog Title",
 *     "summary": "A brief summary of the article.",
 *     "content": "<p>Your HTML content here.</p>",
 *     "coverImage": "https://example.com/image.jpg",
 *     "tags": ["AI", "Technology"],
 *     "source": "Rolplay AI"
 *   }'
 */

export const sampleBlogs = [
  {
    title: 'The Future of AI in Healthcare: 2026 Analysis',
    summary: 'An in-depth look at how artificial intelligence is transforming healthcare delivery, from diagnostic imaging to personalized treatment plans.',
    content: `
      <h2>Introduction</h2>
      <p>Artificial intelligence has emerged as one of the most transformative forces in healthcare. As we move through 2026, the integration of AI into clinical workflows has accelerated beyond what many experts predicted just five years ago.</p>
      
      <h2>Diagnostic Revolution</h2>
      <p>AI-powered diagnostic systems are now achieving accuracy rates that match or exceed human specialists in several key areas:</p>
      <ul>
        <li>Medical imaging analysis with 97% accuracy</li>
        <li>Early cancer detection through pattern recognition</li>
        <li>Real-time patient monitoring and anomaly detection</li>
      </ul>
      
      <h2>Personalized Medicine</h2>
      <p>The promise of personalized medicine is becoming reality as AI systems analyze genetic data, medical histories, and lifestyle factors to recommend tailored treatment protocols.</p>
      
      <blockquote>AI is not replacing doctors; it's augmenting their capabilities to provide better patient outcomes.</blockquote>
      
      <h2>Market Impact</h2>
      <p>The global AI healthcare market is projected to reach $188 billion by 2030, growing at a CAGR of 37%. Key growth drivers include:</p>
      <ol>
        <li>Increasing adoption of electronic health records</li>
        <li>Growing demand for precision medicine</li>
        <li>Rising healthcare costs driving efficiency needs</li>
      </ol>
      
      <h2>Challenges and Considerations</h2>
      <p>Despite the progress, significant challenges remain in data privacy, regulatory compliance, and ensuring equitable access to AI-powered healthcare solutions.</p>
      
      <h2>Conclusion</h2>
      <p>The convergence of AI and healthcare represents one of the most significant opportunities of our time. As technology continues to evolve, we can expect even more breakthrough applications that improve patient outcomes and reduce costs.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop',
    tags: ['AI', 'Healthcare', 'Technology', 'Innovation'],
    source: 'Rolplay AI Research',
  },
  {
    title: 'Tesla Stock Analysis: Market Trends and Future Outlook',
    summary: 'A comprehensive analysis of Tesla stock performance, market position, and growth trajectory in the evolving electric vehicle landscape.',
    content: `
      <h2>Market Overview</h2>
      <p>Tesla continues to dominate the electric vehicle market, with Q1 2026 deliveries exceeding analyst expectations. The company's market capitalization reflects investor confidence in its long-term growth strategy.</p>
      
      <h2>Key Metrics</h2>
      <table>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Q1 Deliveries</td>
          <td>512,000 vehicles</td>
        </tr>
        <tr>
          <td>Revenue Growth YoY</td>
          <td>+23%</td>
        </tr>
        <tr>
          <td>Gross Margin</td>
          <td>19.3%</td>
        </tr>
      </table>
      
      <h2>Competitive Landscape</h2>
      <p>The EV market is becoming increasingly competitive, with traditional automakers ramping up electric offerings and new entrants challenging Tesla's dominance in various segments.</p>
      
      <h2>Growth Drivers</h2>
      <ul>
        <li>Expansion into new markets, particularly India and Southeast Asia</li>
        <li>Energy storage business growth</li>
        <li>Full Self-Driving technology advancement</li>
        <li>Next-generation vehicle platform</li>
      </ul>
      
      <h2>Risk Factors</h2>
      <p>Key risks include supply chain disruptions, regulatory changes, and intensifying competition. Investors should monitor production capacity utilization and margin trends closely.</p>
      
      <h2>Outlook</h2>
      <p>Analysts maintain a generally positive outlook on Tesla, with price targets ranging based on assumptions about autonomous driving timeline and energy business growth.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=630&fit=crop',
    tags: ['Finance', 'Tesla', 'EV', 'Markets'],
    source: 'Rolplay AI Markets',
  },
  {
    title: 'Quantum Computing Breakthrough: What It Means for Tech',
    summary: 'Recent advances in quantum computing are bringing us closer to practical applications. Here is what industry leaders and investors need to know.',
    content: `
      <h2>The Quantum Leap</h2>
      <p>A major breakthrough in quantum error correction has brought practical quantum computing closer to reality. Researchers have demonstrated a 1000-qubit system with error rates low enough for meaningful computation.</p>
      
      <h2>Why It Matters</h2>
      <p>Quantum computing promises to solve problems that are intractable for classical computers. Applications include:</p>
      <ul>
        <li>Drug discovery and molecular simulation</li>
        <li>Optimization problems in logistics and finance</li>
        <li>Cryptography and security</li>
        <li>Climate modeling and materials science</li>
      </ul>
      
      <h2>Industry Response</h2>
      <p>Major tech companies are accelerating their quantum computing investments. IBM, Google, and Microsoft have all announced significant milestones in their quantum roadmaps.</p>
      
      <h2>Investment Landscape</h2>
      <p>Quantum computing startups raised over $2.5 billion in funding in 2025, signaling strong investor confidence in the technology's commercial potential.</p>
      
      <h2>Timeline to Practical Use</h2>
      <p>While significant progress has been made, experts estimate that widespread commercial quantum computing applications are still 5-10 years away. However, early adopters are already exploring niche applications.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
    tags: ['Quantum Computing', 'Technology', 'Innovation', 'Science'],
    source: 'Rolplay AI Tech',
  },
];
