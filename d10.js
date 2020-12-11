const input = `74
153
60
163
112
151
22
67
43
160
193
6
2
16
122
126
32
181
180
139
20
111
66
81
12
56
63
95
90
161
33
134
31
119
53
148
104
91
140
36
144
23
130
178
146
38
133
192
131
3
73
11
62
50
89
98
103
110
164
48
80
179
92
194
86
40
13
123
68
115
19
46
77
152
138
69
49
59
30
132
9
185
1
188
171
72
116
101
61
141
107
21
47
147
182
170
39
37
127
26
102
137
191
162
172
29
10
154
157
83
82
175
145
167`;

const adapters = input.split("\n").map(l => parseInt(l)).sort((a, b) => a - b);
const laptop = adapters[adapters.length - 1] + 3;
const devs = [0, ...adapters, laptop];
const devSet = new Set(devs);
const opts = devs.reduce((r, d) => ({...r, [d]: [d + 1, d + 2, d + 3].filter(nd => devSet.has(nd))}), {});
const hopsLeft = devs.reduce((r,d, i) => ({...r, [d]: devs.length - i - 1}), {});
let highScore = 0;
let highScoreRoute = null;

const findChain = (d, r = []) => {
  const opt = opts[d];
  if (hopsLeft[d] + r.length < (devs.length - 1)) {
    return;
  }
  if (opt.length === 0) {
    r = [...r, d];
    if (r.length > highScore) {
      highScore = r.length;
      highScoreRoute = r;
    }
    return;
  }
  opt.map(nd => findChain(nd, [...r, d]));
}

const findDiff = (route) => {
  let prev = route.shift();
  let cur = null
  const diff = [null, 0, 0, 0];
  while(cur = route.shift()) {
    diff[cur-prev]++;
    prev = cur;
  }
  return diff;
}

findChain(0);
const diffs = findDiff(highScoreRoute);
console.log(diffs[3] * diffs[1]);




const ipts = devs.reduce((r, d) => ({...r, [d]: [d - 1, d - 2, d - 3].filter(nd => devSet.has(nd))}), {});
const paths = devs.reduce((r, d) => ({...r, [d]: {}}), {});

const count = (d) => {
  const total = d === 0 ? 1 : ipts[d].reduce((t, ld) => t + paths[d][ld], 0);
  for(let nd of opts[d]) {
    if (paths[nd][d]) continue;
    paths[nd][d] = (paths[nd][d] || 0) + total;
    count(nd);
  }
}

console.log(count(0));
