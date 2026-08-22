const [events, lineups] = await Promise.all([
  fetch('https://soccer.highlightly.net/events/1325320101', {
    headers: { 'x-rapidapi-key': '38fc70e4-38e9-42af-96cc-f1566cdf2c1e' }
  }).then(r => r.json()),
  fetch('https://soccer.highlightly.net/lineups/1325320101', {
    headers: { 'x-rapidapi-key': 'YOUR_KEY_HERE' }
  }).then(r => r.json()),
]);

const goals = events.filter(e => e.type === 'Goal' || e.type === 'Penalty');
console.log('Goals:', goals.map(g => g.player));

const starters = (lineups.homeTeam?.initialLineup || []).flat();
console.log('Lineup names with special chars:', starters.filter(p => 
  p.name !== p.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
).map(p => p.name));