import type { Story } from '@/types';

// Helper to build ISO dates relative to "now" so demo always feels fresh.
const daysAgo = (n: number, h = 8) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, 12, 0, 0);
  return d.toISOString();
};

export const STORIES: Story[] = [
  {
    id: 'ai-frontier-models-safety',
    headline: 'Frontier AI labs agree on shared safety evaluations for next-generation models',
    quickTake: 'Leading AI labs and three national safety institutes agreed to run a common set of safety evaluations before releasing next-generation models.',
    keyDevelopments: [
      'The agreement covers capability thresholds, third-party evaluation access, and incident reporting within 30 days.',
      'Two independent evaluation bodies will publish methods openly so results can be reproduced.',
      'First shared evaluation round is scheduled before the end of the quarter.',
      'Open-weight releases above an agreed capability line will require an additional review step.',
    ],
    whyItMatters: 'This is the first time rival labs have committed to the same pre-release test suite, which makes safety claims comparable instead of marketing-led.',
    contextDeepDive:
      'Voluntary AI safety commitments began in 2023 with summit declarations, but each lab used different tests. Researchers argued this made progress unverifiable. The new protocol borrows from aviation incident reporting and clinical trial preregistration: define the test before the model exists, then publish both passes and failures. Journals covering this shift include Nature Machine Intelligence and the AI Safety literature; official documentation is expected from the participating institutes.',
    scope: { id: 'ai', type: 'topic', label: 'AI / Topic', level: 0 },
    topicTags: ['AI', 'Technology'],
    imageUrl: '',
    imageAlt: 'Abstract illustration of neural network evaluation checkpoints',
    publishedAt: daysAgo(6),
    updatedAt: daysAgo(0),
    readingTime: 8,
    facts: [
      { id: 'ai-safety-f1', storyId: 'ai-frontier-models-safety', content: 'Three national safety institutes and four frontier labs signed the shared-evaluation accord.', date: daysAgo(6), level: 'quick' },
      { id: 'ai-safety-f2', storyId: 'ai-frontier-models-safety', content: 'The protocol defines capability thresholds that trigger mandatory third-party testing.', date: daysAgo(6), level: 'developments' },
      { id: 'ai-safety-f3', storyId: 'ai-frontier-models-safety', content: 'Evaluation methods will be published openly for reproducibility.', date: daysAgo(3), level: 'developments' },
      { id: 'ai-safety-f4', storyId: 'ai-frontier-models-safety', content: 'Incident reports must be filed within 30 days of discovery.', date: daysAgo(3), level: 'developments' },
      { id: 'ai-safety-f5', storyId: 'ai-frontier-models-safety', content: 'First full evaluation round confirmed for this quarter; open-weight releases above the capability line face extra review.', date: daysAgo(0), level: 'quick' },
    ],
    milestones: [
      { id: 'ai-safety-m1', storyId: 'ai-frontier-models-safety', date: daysAgo(6), title: 'Accord announced', summary: 'Labs and institutes commit to a common pre-release test suite.', type: 'event', factIds: ['ai-safety-f1', 'ai-safety-f2'] },
      { id: 'ai-safety-m2', storyId: 'ai-frontier-models-safety', date: daysAgo(3), title: 'Methods published', summary: 'Independent evaluators release open testing methodology.', type: 'event', factIds: ['ai-safety-f3', 'ai-safety-f4'] },
      { id: 'ai-safety-m3', storyId: 'ai-frontier-models-safety', date: daysAgo(0), title: 'First evaluation round scheduled', summary: 'Timeline confirmed; extra review for high-capability open releases.', type: 'current', factIds: ['ai-safety-f5'] },
    ],
    sources: [
      { id: 'ai-s1', name: 'Nature Machine Intelligence', url: 'https://www.nature.com/natmachintell/', type: 'research', credibility: 'high' },
      { id: 'ai-s2', name: 'Institute press release', url: 'https://example.org/safety-accord', type: 'official', credibility: 'high' },
      { id: 'ai-s3', name: 'Technology desk reporting', url: 'https://example.org/tech-desk', type: 'news', credibility: 'medium' },
    ],
    futurePossibility: {
      text: 'The first shared evaluation results are published with comparable scores across labs.',
      evidence: 'Seed data includes a confirmed evaluation timetable and a commitment to publish methods openly.',
      plausibility: 'medium',
    },
  },
  {
    id: 'monsoon-rajasthan-water',
    headline: 'Above-average monsoon refills Rajasthan reservoirs, eases Jaipur water schedule',
    quickTake: 'Rajasthan recorded 18% above-average rainfall this season, lifting major reservoir levels and allowing Jaipur to ease its alternate-day water schedule.',
    keyDevelopments: [
      'Bisalpur dam, Jaipur’s main supply, crossed 85% capacity for the first time in three years.',
      'Jaipur water board restored daily morning supply in 9 of 16 zones.',
      'State agriculture department reports kharif sowing up 12% year on year.',
      'Groundwater recharge structures in 4 districts reported measurable gains.',
    ],
    whyItMatters: 'Water security shapes daily life in Jaipur more than almost any other public service; reservoir recovery directly reduces tanker dependence and supply cuts.',
    contextDeepDive:
      'Rajasthan is India’s largest state by area and among its driest. Bisalpur dam on the Banas river supplies Jaipur, Ajmer and Tonk. After two deficit years, the state invested in check dams and farm ponds under the national watershed programme. Hydrology researchers note that one strong season rebuilds surface storage but groundwater recovery takes consecutive normal years.',
    scope: { id: 'jaipur', type: 'local', label: 'Jaipur / Local', level: 3, parentId: 'rajasthan' },
    topicTags: ['Environment'],
    imageUrl: '',
    imageAlt: 'Bisalpur reservoir with water gates and surrounding hills',
    publishedAt: daysAgo(5),
    updatedAt: daysAgo(1),
    readingTime: 5,
    facts: [
      { id: 'monsoon-f1', storyId: 'monsoon-rajasthan-water', content: 'State rainfall ended the season 18% above the long-period average.', date: daysAgo(5), level: 'quick' },
      { id: 'monsoon-f2', storyId: 'monsoon-rajasthan-water', content: 'Bisalpur dam crossed 85% capacity, first time in three years.', date: daysAgo(5), level: 'developments' },
      { id: 'monsoon-f3', storyId: 'monsoon-rajasthan-water', content: 'Kharif sowing rose 12% year on year, per the agriculture department.', date: daysAgo(2), level: 'developments' },
      { id: 'monsoon-f4', storyId: 'monsoon-rajasthan-water', content: 'Jaipur restored daily morning supply in 9 of 16 zones.', date: daysAgo(1), level: 'quick' },
    ],
    milestones: [
      { id: 'monsoon-m1', storyId: 'monsoon-rajasthan-water', date: daysAgo(5), title: 'Season closes above average', summary: 'Rainfall 18% above average; reservoirs begin rapid recharge.', type: 'event', factIds: ['monsoon-f1', 'monsoon-f2'] },
      { id: 'monsoon-m2', storyId: 'monsoon-rajasthan-water', date: daysAgo(2), title: 'Sowing picks up', summary: 'Kharif acreage rises 12% as soil moisture improves.', type: 'event', factIds: ['monsoon-f3'] },
      { id: 'monsoon-m3', storyId: 'monsoon-rajasthan-water', date: daysAgo(1), title: 'Jaipur supply eased', summary: 'Daily morning supply restored in a majority of zones.', type: 'current', factIds: ['monsoon-f4'] },
    ],
    sources: [
      { id: 'mon-s1', name: 'State water resources bulletin', url: 'https://example.org/water-bulletin', type: 'official' },
      { id: 'mon-s2', name: 'Regional news reporting', url: 'https://example.org/regional-news', type: 'news' },
    ],
  },
  {
    id: 'india-digital-health-mission',
    headline: 'India’s digital health mission crosses 500 million linked records',
    quickTake: 'The national digital health mission crossed 500 million linked health records, with opt-in consent routing now live in 28 states.',
    keyDevelopments: [
      'Patients can now share records across hospitals with time-bound digital consent.',
      'Over 280,000 health facilities are registered on the national network.',
      'Pharmacy and lab integrations doubled in the past year.',
      'An audit framework for data access logs was published for public comment.',
    ],
    whyItMatters: 'Portable health records reduce repeated tests and lost prescriptions, especially for patients who move between cities for care.',
    contextDeepDive:
      'The Ayushman Bharat Digital Mission builds a federated record system: data stays with providers and moves only with consent. Health-policy researchers compare it to Estonia’s X-Road and note the central challenge is consistent consent UX across languages. Privacy reviews are ongoing; the mission states records are opt-in and deletable.',
    scope: { id: 'india', type: 'national', label: 'India / National', level: 1, parentId: 'global' },
    topicTags: ['Health', 'Technology'],
    imageUrl: '',
    imageAlt: 'Doctor reviewing a secure digital health record on a tablet',
    publishedAt: daysAgo(4),
    updatedAt: daysAgo(0),
    readingTime: 7,
    facts: [
      { id: 'health-f1', storyId: 'india-digital-health-mission', content: 'Linked health records crossed 500 million nationally.', date: daysAgo(4), level: 'quick' },
      { id: 'health-f2', storyId: 'india-digital-health-mission', content: '280,000+ facilities registered; pharmacy and lab integrations doubled.', date: daysAgo(4), level: 'developments' },
      { id: 'health-f3', storyId: 'india-digital-health-mission', content: 'Time-bound consent sharing went live in 28 states.', date: daysAgo(2), level: 'developments' },
      { id: 'health-f4', storyId: 'india-digital-health-mission', content: 'Draft audit framework for data-access logs opened for public comment.', date: daysAgo(0), level: 'quick' },
    ],
    milestones: [
      { id: 'health-m1', storyId: 'india-digital-health-mission', date: daysAgo(4), title: '500M records milestone', summary: 'National network passes half a billion linked records.', type: 'event', factIds: ['health-f1', 'health-f2'] },
      { id: 'health-m2', storyId: 'india-digital-health-mission', date: daysAgo(2), title: 'Consent routing expands', summary: 'Cross-hospital sharing live across 28 states.', type: 'event', factIds: ['health-f3'] },
      { id: 'health-m3', storyId: 'india-digital-health-mission', date: daysAgo(0), title: 'Audit draft published', summary: 'Public comment opened on access-log auditing.', type: 'current', factIds: ['health-f4'] },
    ],
    sources: [
      { id: 'h-s1', name: 'Mission official dashboard', url: 'https://example.org/health-mission', type: 'official' },
      { id: 'h-s2', name: 'Health policy journal', url: 'https://example.org/health-policy', type: 'research' },
    ],
  },
  {
    id: 'global-shipping-red-sea',
    headline: 'Global shipping steadies as Red Sea transits partially resume',
    quickTake: 'Container traffic through the Red Sea recovered to roughly 70% of normal volumes as convoy arrangements and insurance terms stabilised.',
    keyDevelopments: [
      'Average Asia–Europe transit times fell by 6 days from the peak disruption.',
      'War-risk insurance premiums eased about 25% from January highs.',
      'Two major carriers restored weekly schedules; one remains rerouted around Africa.',
      'Port congestion at alternative hubs began clearing.',
    ],
    whyItMatters: 'Shorter, cheaper shipping lanes lower import costs for everything from electronics to medicines, with effects visible within weeks.',
    contextDeepDive:
      'The Red Sea–Suez route normally carries about 12% of global trade. Disruptions forced rerouting around the Cape of Good Hope, adding 10–14 days. Maritime economists note recovery is fragile: a single incident reprices insurance within days. Shippers responded by diversifying transshipment hubs.',
    scope: { id: 'global', type: 'global', label: 'Global', level: 0 },
    topicTags: ['Business'],
    imageUrl: '',
    imageAlt: 'Container ships in a calm sea lane at dawn',
    publishedAt: daysAgo(7),
    updatedAt: daysAgo(1),
    readingTime: 6,
    facts: [
      { id: 'ship-f1', storyId: 'global-shipping-red-sea', content: 'Red Sea transits recovered to ~70% of normal volumes.', date: daysAgo(7), level: 'quick' },
      { id: 'ship-f2', storyId: 'global-shipping-red-sea', content: 'Asia–Europe transit times fell 6 days from peak; premiums eased ~25%.', date: daysAgo(3), level: 'developments' },
      { id: 'ship-f3', storyId: 'global-shipping-red-sea', content: 'Two carriers restored weekly schedules; alternative-hub congestion clearing.', date: daysAgo(1), level: 'quick' },
    ],
    milestones: [
      { id: 'ship-m1', storyId: 'global-shipping-red-sea', date: daysAgo(7), title: 'Transits resume', summary: 'Convoy system restores partial Red Sea traffic.', type: 'event', factIds: ['ship-f1'] },
      { id: 'ship-m2', storyId: 'global-shipping-red-sea', date: daysAgo(3), title: 'Costs ease', summary: 'Transit times and premiums fall from crisis peaks.', type: 'event', factIds: ['ship-f2'] },
      { id: 'ship-m3', storyId: 'global-shipping-red-sea', date: daysAgo(1), title: 'Schedules stabilise', summary: 'Weekly services return on two major routes.', type: 'current', factIds: ['ship-f3'] },
    ],
    sources: [
      { id: 'sh-s1', name: 'Maritime trade review', url: 'https://example.org/maritime', type: 'news' },
      { id: 'sh-s2', name: 'Port authority data', url: 'https://example.org/ports', type: 'official' },
    ],
  },
  {
    id: 'quantum-error-correction-nature',
    headline: 'Quantum error-correction result brings fault-tolerant computing a step closer',
    quickTake: 'A peer-reviewed experiment showed logical qubits outperforming physical qubits as code distance grows — a key threshold for useful quantum computers.',
    keyDevelopments: [
      'Logical error rate fell as researchers scaled from distance-3 to distance-7 codes.',
      'The result held for over 100 rounds of error correction.',
      'Independent commentary called the methodology unusually transparent.',
      'Authors caution that real-world workloads need further orders of magnitude.',
    ],
    whyItMatters: 'Error correction is the gap between fragile lab qubits and dependable machines that could design drugs and materials.',
    contextDeepDive:
      'Published in a peer-reviewed journal, the study used superconducting qubits with real-time decoding. Prior milestones showed break-even; this shows scaling in the right direction. Reference: journal publication with supplementary data and open analysis code. Practical machines still require millions of physical qubits and faster decoders.',
    scope: { id: 'global', type: 'global', label: 'Global', level: 0 },
    topicTags: ['Science', 'Technology'],
    imageUrl: '',
    imageAlt: 'Laboratory cryostat used for quantum computing research',
    publishedAt: daysAgo(8),
    updatedAt: daysAgo(2),
    readingTime: 18,
    facts: [
      { id: 'qc-f1', storyId: 'quantum-error-correction-nature', content: 'Logical qubits beat physical qubits as code distance increased.', date: daysAgo(8), level: 'quick' },
      { id: 'qc-f2', storyId: 'quantum-error-correction-nature', content: 'Scaling from distance-3 to distance-7 lowered logical error rates.', date: daysAgo(8), level: 'developments' },
      { id: 'qc-f3', storyId: 'quantum-error-correction-nature', content: 'Stability held across 100+ rounds with open analysis code.', date: daysAgo(2), level: 'developments' },
    ],
    milestones: [
      { id: 'qc-m1', storyId: 'quantum-error-correction-nature', date: daysAgo(8), title: 'Paper published', summary: 'Peer-reviewed scaling result announced.', type: 'event', factIds: ['qc-f1', 'qc-f2'] },
      { id: 'qc-m2', storyId: 'quantum-error-correction-nature', date: daysAgo(2), title: 'Independent validation notes', summary: 'Commentators confirm transparent, reproducible methods.', type: 'current', factIds: ['qc-f3'] },
    ],
    sources: [
      { id: 'qc-s1', name: 'Peer-reviewed journal', url: 'https://example.org/journal-quantum', type: 'research', credibility: 'high' },
      { id: 'qc-s2', name: 'University lab page', url: 'https://example.org/lab', type: 'official' },
    ],
  },
  {
    id: 'mangrove-restoration-study',
    headline: 'Mangrove restoration shown to cut coastal erosion twice as fast as expected',
    quickTake: 'A multi-year field study found restored mangroves reduced shoreline erosion up to twice as fast as models predicted.',
    keyDevelopments: [
      'Wave-energy reduction reached 55% within three growing seasons.',
      'Fish nursery counts rose 40% in restored plots versus control sites.',
      'Community-maintained plots outperformed contractor-only sites.',
      'Authors released a low-cost planting protocol for tropical coasts.',
    ],
    whyItMatters: 'Mangroves protect coastal roads, homes and fisheries at a fraction of seawall costs — relevant from Odisha to Gujarat.',
    contextDeepDive:
      'Published in a peer-reviewed ecology journal, the study tracked 12 sites over four years with drone surveys and sediment cores. Reference data and protocol are openly archived. Limitations: results vary with freshwater inflow and storm intensity; authors call for 10-year follow-up.',
    scope: { id: 'global', type: 'global', label: 'Global', level: 0 },
    topicTags: ['Science', 'Environment'],
    imageUrl: '',
    imageAlt: 'Young mangrove saplings along a calm coastal shoreline',
    publishedAt: daysAgo(9),
    updatedAt: daysAgo(4),
    readingTime: 16,
    facts: [
      { id: 'mang-f1', storyId: 'mangrove-restoration-study', content: 'Restored mangroves cut erosion up to 2x faster than models predicted.', date: daysAgo(9), level: 'quick' },
      { id: 'mang-f2', storyId: 'mangrove-restoration-study', content: 'Wave energy fell 55% in three seasons; fish nurseries rose 40%.', date: daysAgo(9), level: 'developments' },
      { id: 'mang-f3', storyId: 'mangrove-restoration-study', content: 'Open low-cost planting protocol released; community plots performed best.', date: daysAgo(4), level: 'developments' },
    ],
    milestones: [
      { id: 'mang-m1', storyId: 'mangrove-restoration-study', date: daysAgo(9), title: 'Study published', summary: 'Four-year, 12-site field results released.', type: 'event', factIds: ['mang-f1', 'mang-f2'] },
      { id: 'mang-m2', storyId: 'mangrove-restoration-study', date: daysAgo(4), title: 'Protocol shared', summary: 'Open planting guide enables community replication.', type: 'current', factIds: ['mang-f3'] },
    ],
    sources: [
      { id: 'mg-s1', name: 'Ecology journal', url: 'https://example.org/ecology-journal', type: 'research', credibility: 'high' },
      { id: 'mg-s2', name: 'Field data archive', url: 'https://example.org/field-data', type: 'official' },
    ],
  },
  {
    id: 'jaipur-metro-phase2',
    headline: 'Jaipur Metro Phase 2 gets revised timeline as elevated corridor work begins',
    quickTake: 'Jaipur Metro’s Phase 2 entered active construction on the elevated corridor, with a revised 30-month target for the first new section.',
    keyDevelopments: [
      'Piling work started on a 7.5 km elevated stretch connecting the southern suburbs.',
      'The revised plan prioritises the high-ridership airport–industrial belt first.',
      'Traffic diversions announced for three arterial roads with night-work windows.',
      'A unified ticketing pilot with city buses begins next quarter.',
    ],
    whyItMatters: 'For Jaipur commuters, this corridor could cut peak-hour travel on the busiest southern route from 55 to 25 minutes.',
    contextDeepDive:
      'Phase 1 (Mansarovar–Chandpole) opened in 2015 and carries modest ridership compared to Delhi or Bengaluru. Planners say Phase 2 targets employment clusters rather than only the old city. Funding blends state support and multilateral lending; land acquisition for two stations remains in process.',
    scope: { id: 'jaipur', type: 'local', label: 'Jaipur / Local', level: 3, parentId: 'rajasthan' },
    topicTags: ['Business', 'Culture'],
    imageUrl: '',
    imageAlt: 'Metro construction pillars along a Jaipur arterial road',
    publishedAt: daysAgo(3),
    updatedAt: daysAgo(0),
    readingTime: 4,
    facts: [
      { id: 'metro-f1', storyId: 'jaipur-metro-phase2', content: 'Piling began on a 7.5 km elevated southern corridor.', date: daysAgo(3), level: 'quick' },
      { id: 'metro-f2', storyId: 'jaipur-metro-phase2', content: 'Revised 30-month target prioritises the airport–industrial belt.', date: daysAgo(3), level: 'developments' },
      { id: 'metro-f3', storyId: 'jaipur-metro-phase2', content: 'Unified bus–metro ticketing pilot starts next quarter.', date: daysAgo(0), level: 'quick' },
    ],
    milestones: [
      { id: 'metro-m1', storyId: 'jaipur-metro-phase2', date: daysAgo(3), title: 'Construction starts', summary: 'Piling and traffic diversions begin on southern stretch.', type: 'event', factIds: ['metro-f1', 'metro-f2'] },
      { id: 'metro-m2', storyId: 'jaipur-metro-phase2', date: daysAgo(0), title: 'Ticketing pilot announced', summary: 'Single ticket for metro and city buses enters pilot.', type: 'current', factIds: ['metro-f3'] },
    ],
    sources: [
      { id: 'mt-s1', name: 'Metro rail corporation notice', url: 'https://example.org/metro', type: 'official' },
      { id: 'mt-s2', name: 'City reporting', url: 'https://example.org/city-news', type: 'news' },
    ],
  },
  {
    id: 'rajasthan-solar-desert-park',
    headline: 'Rajasthan’s desert solar park expansion adds 2 GW to the grid',
    quickTake: 'A phased 2 GW addition from Rajasthan’s desert solar parks began feeding the national grid, with daytime tariffs among the lowest recorded.',
    keyDevelopments: [
      'Daytime tariffs for the new blocks cleared near ₹2.45 per unit.',
      'A new 765 kV transmission corridor reduced curtailment risk.',
      'Local employment in operations and panel cleaning passed 8,000 roles.',
      'Battery-storage tender for evening supply was oversubscribed.',
    ],
    whyItMatters: 'Cheap daytime solar from Rajasthan is now a national price-setter, affecting bills and industrial siting far beyond the state.',
    contextDeepDive:
      'Rajasthan hosts Bhadla, among the world’s largest solar parks, with irradiance among India’s best. Grid integration has been the constraint, not panels. Energy researchers point to storage as the next bottleneck: solar covers the day, but evening demand needs batteries or hybrid wind.',
    scope: { id: 'rajasthan', type: 'regional', label: 'Rajasthan / Regional', level: 2, parentId: 'india' },
    topicTags: ['Environment', 'Business'],
    imageUrl: '',
    imageAlt: 'Rows of solar panels in the Thar desert under clear sky',
    publishedAt: daysAgo(4),
    updatedAt: daysAgo(1),
    readingTime: 6,
    facts: [
      { id: 'solar-f1', storyId: 'rajasthan-solar-desert-park', content: '2 GW phased addition began feeding the national grid.', date: daysAgo(4), level: 'quick' },
      { id: 'solar-f2', storyId: 'rajasthan-solar-desert-park', content: 'Tariffs near ₹2.45/unit; new 765 kV corridor cut curtailment.', date: daysAgo(4), level: 'developments' },
      { id: 'solar-f3', storyId: 'rajasthan-solar-desert-park', content: 'Battery-storage tender for evening supply oversubscribed.', date: daysAgo(1), level: 'quick' },
    ],
    milestones: [
      { id: 'solar-m1', storyId: 'rajasthan-solar-desert-park', date: daysAgo(4), title: 'Capacity energised', summary: '2 GW addition connects via new transmission corridor.', type: 'event', factIds: ['solar-f1', 'solar-f2'] },
      { id: 'solar-m2', storyId: 'rajasthan-solar-desert-park', date: daysAgo(1), title: 'Storage interest surges', summary: 'Evening-supply battery tender draws record bids.', type: 'current', factIds: ['solar-f3'] },
    ],
    sources: [
      { id: 'so-s1', name: 'Grid operator report', url: 'https://example.org/grid', type: 'official' },
      { id: 'so-s2', name: 'Energy analysis', url: 'https://example.org/energy', type: 'news' },
    ],
  },
  {
    id: 'test-cricket-pink-ball',
    headline: 'Pink-ball Test reopens debate as bowlers dominate opening days',
    quickTake: 'A day-night Test finished inside three days with 30 wickets falling to seam movement, reigniting debate over pink-ball balance.',
    keyDevelopments: [
      'Seamers took 26 of 30 wickets; spinners bowled under 20 overs total.',
      'Players cited heavy evening dew and pronounced twilight swing.',
      'Broadcast ratings for the evening sessions hit a season high.',
      'Match referee rated the pitch satisfactory; the ball, not the surface, drew scrutiny.',
    ],
    whyItMatters: 'Day-night Tests were meant to save the format’s crowds — the cricket question is whether the spectacle preserves a fair bat-ball contest.',
    contextDeepDive:
      'Pink-ball Tests began in 2015 to pull audiences into evening sessions. The lacquered ball swings more under lights but scuffs differently than red. Former players are split: some call twilight conditions an acceptable home advantage; others want standardised ball behaviour.',
    scope: { id: 'global', type: 'global', label: 'Global', level: 0 },
    topicTags: ['Sports'],
    imageUrl: '',
    imageAlt: 'Cricket stadium under floodlights during a day-night Test',
    publishedAt: daysAgo(2),
    updatedAt: daysAgo(1),
    readingTime: 4,
    facts: [
      { id: 'cricket-f1', storyId: 'test-cricket-pink-ball', content: 'Day-night Test ended in three days; 30 wickets fell.', date: daysAgo(2), level: 'quick' },
      { id: 'cricket-f2', storyId: 'test-cricket-pink-ball', content: 'Seamers took 26 wickets; evening ratings hit season high.', date: daysAgo(2), level: 'developments' },
      { id: 'cricket-f3', storyId: 'test-cricket-pink-ball', content: 'Referee rated pitch satisfactory; ball behaviour under review.', date: daysAgo(1), level: 'quick' },
    ],
    milestones: [
      { id: 'cricket-m1', storyId: 'test-cricket-pink-ball', date: daysAgo(2), title: 'Three-day finish', summary: 'Seam dominates as twilight swing proves decisive.', type: 'event', factIds: ['cricket-f1', 'cricket-f2'] },
      { id: 'cricket-m2', storyId: 'test-cricket-pink-ball', date: daysAgo(1), title: 'Review begins', summary: 'Officials focus on ball, not pitch, for next steps.', type: 'current', factIds: ['cricket-f3'] },
    ],
    sources: [
      { id: 'cr-s1', name: 'Match report', url: 'https://example.org/cricket', type: 'news' },
      { id: 'cr-s2', name: 'Board statement', url: 'https://example.org/board', type: 'official' },
    ],
  },
  {
    id: 'open-source-llm-efficiency',
    headline: 'Open efficient language models narrow the gap on low-cost hardware',
    quickTake: 'New openly available models matched last year’s flagship scores on key benchmarks while running on a single consumer GPU.',
    keyDevelopments: [
      'Two 8B-class models topped efficiency charts with 4-bit quantization.',
      'Inference cost per million tokens fell below 15 cents on rented GPUs.',
      'Independent harness scores confirmed gains on reasoning and code tasks.',
      'Licensing remains mixed: one fully open, one research-only.',
    ],
    whyItMatters: 'Cheaper capable models move AI from data-centre demos to laptops, clinics and classrooms with limited connectivity.',
    contextDeepDive:
      'Progress comes from better data curation and distillation rather than raw size. Researchers caution benchmark scores overstate real-task reliability; long-context and tool-use gaps persist. For Jaipur students and small firms, the practical shift is offline-capable assistants without cloud bills.',
    scope: { id: 'ai', type: 'topic', label: 'AI / Topic', level: 0 },
    topicTags: ['AI', 'Technology'],
    imageUrl: '',
    imageAlt: 'Laptop running a local AI model with efficiency charts',
    publishedAt: daysAgo(5),
    updatedAt: daysAgo(2),
    readingTime: 11,
    facts: [
      { id: 'llm-f1', storyId: 'open-source-llm-efficiency', content: 'Open 8B-class models matched prior flagship benchmark scores.', date: daysAgo(5), level: 'quick' },
      { id: 'llm-f2', storyId: 'open-source-llm-efficiency', content: '4-bit builds run on a single consumer GPU; cost under $0.15/M tokens.', date: daysAgo(5), level: 'developments' },
      { id: 'llm-f3', storyId: 'open-source-llm-efficiency', content: 'Independent harness confirmed gains; licensing split open vs research-only.', date: daysAgo(2), level: 'developments' },
    ],
    milestones: [
      { id: 'llm-m1', storyId: 'open-source-llm-efficiency', date: daysAgo(5), title: 'Efficient releases', summary: 'Two open models claim flagship-level efficiency.', type: 'event', factIds: ['llm-f1', 'llm-f2'] },
      { id: 'llm-m2', storyId: 'open-source-llm-efficiency', date: daysAgo(2), title: 'Independent scores', summary: 'Third-party harness validates reasoning and code gains.', type: 'current', factIds: ['llm-f3'] },
    ],
    sources: [
      { id: 'llm-s1', name: 'Model cards and eval harness', url: 'https://example.org/model-cards', type: 'official' },
      { id: 'llm-s2', name: 'Independent benchmark notes', url: 'https://example.org/bench', type: 'research' },
    ],
  },
  {
    id: 'semi-democratic-chips-india',
    headline: 'India clears two semiconductor assembly plants in national chip push',
    quickTake: 'Two chip assembly and testing plants were approved with a combined outlay supporting 20,000 direct roles.',
    keyDevelopments: [
      'Plants will handle packaging and testing; fabrication remains a later stage.',
      'Anchor customers include automotive and telecom equipment makers.',
      'A workforce programme will train 10,000 engineers in three years.',
      'Water and power allocations for the sites were confirmed by state utilities.',
    ],
    whyItMatters: 'Assembly is the fastest credible entry into chips: it builds supplier networks and skills before attempting full fabrication.',
    contextDeepDive:
      'Semiconductor supply chains split into design, fabrication, and assembly-test. India’s strategy starts where capital costs are lowest. Analysts note sustained demand from EVs and 5G hardware underpins the bet; execution risk sits in utilities and talent depth.',
    scope: { id: 'india', type: 'national', label: 'India / National', level: 1, parentId: 'global' },
    topicTags: ['Technology', 'Business'],
    imageUrl: '',
    imageAlt: 'Engineers in a clean room handling chip packaging equipment',
    publishedAt: daysAgo(6),
    updatedAt: daysAgo(3),
    readingTime: 12,
    facts: [
      { id: 'chip-f1', storyId: 'semi-democratic-chips-india', content: 'Two assembly-testing plants approved; 20,000 direct roles projected.', date: daysAgo(6), level: 'quick' },
      { id: 'chip-f2', storyId: 'semi-democratic-chips-india', content: 'Focus is packaging/testing; anchor buyers in auto and telecom.', date: daysAgo(6), level: 'developments' },
      { id: 'chip-f3', storyId: 'semi-democratic-chips-india', content: '10,000-engineer training programme and utility allocations confirmed.', date: daysAgo(3), level: 'developments' },
    ],
    milestones: [
      { id: 'chip-m1', storyId: 'semi-democratic-chips-india', date: daysAgo(6), title: 'Approvals granted', summary: 'Two plants cleared under the national semiconductor mission.', type: 'event', factIds: ['chip-f1', 'chip-f2'] },
      { id: 'chip-m2', storyId: 'semi-democratic-chips-india', date: daysAgo(3), title: 'Enablers lined up', summary: 'Training pipeline and utilities secured.', type: 'current', factIds: ['chip-f3'] },
    ],
    sources: [
      { id: 'ch-s1', name: 'Ministry press note', url: 'https://example.org/chips', type: 'official' },
      { id: 'ch-s2', name: 'Industry analysis', url: 'https://example.org/chip-analysis', type: 'news' },
    ],
  },
  {
    id: 'jaipur-craft-biennale',
    headline: 'Jaipur craft biennale puts artisan futures at the centre',
    quickTake: 'The city’s craft biennale opened with 140 artisan collectives and a first-ever futures pavilion on pricing, provenance and AI-assisted design.',
    keyDevelopments: [
      'A shared provenance registry lets buyers verify maker, materials and hours.',
      'Direct-order volumes in past editions raised artisan incomes by a reported 22%.',
      'Evening programming pairs folk musicians with contemporary designers.',
      'Student passes sold out; workshops run across the walled city.',
    ],
    whyItMatters: 'Craft is Jaipur’s living economy, not décor — fair pricing and attribution decide whether skills survive a generation.',
    contextDeepDive:
      'Jaipur’s blue pottery, block print and jewellery clusters employ tens of thousands. Organisers say the provenance registry answers a long-standing buyer question: who made this, and were they paid fairly? Critics watch whether platforms, not makers, capture the data value.',
    scope: { id: 'jaipur', type: 'local', label: 'Jaipur / Local', level: 3, parentId: 'rajasthan' },
    topicTags: ['Culture'],
    imageUrl: '',
    imageAlt: 'Artisans demonstrating block printing at an open biennale pavilion',
    publishedAt: daysAgo(1),
    updatedAt: daysAgo(0),
    readingTime: 3,
    facts: [
      { id: 'craft-f1', storyId: 'jaipur-craft-biennale', content: 'Biennale opened with 140 artisan collectives and a futures pavilion.', date: daysAgo(1), level: 'quick' },
      { id: 'craft-f2', storyId: 'jaipur-craft-biennale', content: 'Provenance registry verifies maker, materials and hours worked.', date: daysAgo(1), level: 'developments' },
      { id: 'craft-f3', storyId: 'jaipur-craft-biennale', content: 'Student passes sold out; workshops spread across the walled city.', date: daysAgo(0), level: 'quick' },
    ],
    milestones: [
      { id: 'craft-m1', storyId: 'jaipur-craft-biennale', date: daysAgo(1), title: 'Biennale opens', summary: 'Record artisan turnout with provenance focus.', type: 'event', factIds: ['craft-f1', 'craft-f2'] },
      { id: 'craft-m2', storyId: 'jaipur-craft-biennale', date: daysAgo(0), title: 'Public days begin', summary: 'Workshops and evening programmes draw full houses.', type: 'current', factIds: ['craft-f3'] },
    ],
    sources: [
      { id: 'crf-s1', name: 'Biennale programme', url: 'https://example.org/biennale', type: 'official' },
      { id: 'crf-s2', name: 'Culture reporting', url: 'https://example.org/culture', type: 'news' },
    ],
  },
];

export const SEED_SAVED = [
  { storyId: 'quantum-error-correction-nature', savedAt: daysAgo(1) },
  { storyId: 'open-source-llm-efficiency', savedAt: daysAgo(2) },
  { storyId: 'jaipur-craft-biennale', savedAt: daysAgo(0) },
];

// Facts the demo user has "already read" — enables no-repeat demo.
export const SEED_SEEN_FACTS: Record<string, string[]> = {
  'ai-frontier-models-safety': ['ai-safety-f1', 'ai-safety-f2'],
  'monsoon-rajasthan-water': ['monsoon-f1', 'monsoon-f2'],
  'india-digital-health-mission': ['health-f1'],
};

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export function getRelatedStories(id: string, max = 3): Story[] {
  const base = getStory(id);
  if (!base) return [];
  return STORIES.filter((s) => s.id !== id)
    .map((s) => {
      let score = 0;
      if (s.scope.id === base.scope.id) score += 3;
      if (s.scope.type === base.scope.type) score += 1;
      const overlap = s.topicTags.filter((t) => base.topicTags.includes(t)).length;
      score += overlap * 2;
      return { s, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => x.s);
}
