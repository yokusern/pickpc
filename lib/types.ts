export interface Laptop {
  id:       string;
  name:     string;
  maker:    string;   // maker id
  series:   string;
  price:    number;   // 最安値 JPY
  priceMax?: number;
  cpu: {
    model:      string;
    brand:      "intel" | "amd" | "apple";
    generation?: string;
    cores:      number;
    threads?:   number;
    tdp?:       number;
  };
  ram:      number;   // GB
  storage: {
    size:  number;    // GB
    type:  "nvme" | "sata" | "emmc";
  };
  gpu: {
    type:   "integrated" | "discrete";
    model:  string;
    vram?:  number;
  };
  display: {
    size:       number;
    resolution: string;
    refresh:    number;
    panel?:     string;
    brightness?: number;
  };
  weight:      number;     // kg
  battery:     number;     // 目安時間
  os:          "windows" | "macos";
  tags:        string[];   // "gaming" "work" "student" "mobile" "creator" "beginner"
  score: {
    overall:     number;
    performance: number;
    portability: number;
    display:     number;
    keyboard:    number;
    value:       number;
  };
  description: string;
  pros:        string[];
  cons:        string[];
  amazonUrl?:  string;
  rakutenUrl?: string;
  makerUrl?:   string;
  image?:      string;     // /images/products/{id}.jpg
  highlight?:  string;     // 1行キャッチ
  new?:           boolean;
  popular?:       boolean;
  featured?:      boolean;
  badge?:         string;
  isRefurbished?: boolean;
}

export interface Maker {
  id:          string;
  name:        string;
  nameJa:      string;
  country:     string;
  founded?:    number;
  hq?:         string;
  marketShare?: number;   // %
  logo?:       string;
  tagline:     string;
  overview:    string;
  series: {
    name:    string;
    target:  string;
    desc:    string;
    lines?:  string[];
  }[];
  strengths:   string[];
  weaknesses:  string[];
  recommend:   string;    // こんな人に
  ratings: {
    performance: number;
    design:      number;
    keyboard:    number;
    display:     number;
    value:       number;
    support:     number;
  };
  featuredModels: string[]; // laptop IDs
}

export interface Build {
  id:          string;
  name:        string;
  budget:      number;        // JPY
  budgetLabel: string;
  target:      string;
  games?:      string[];
  parts: {
    category: string;
    name:     string;
    price:    number;
    reason:   string;
    amazonUrl?: string;
  }[];
  totalPrice:  number;
  osNote?:     string;
  performances: {
    game:    string;
    setting: string;
    fps:     string;
  }[];
  upgrades?: { what: string; cost: string; effect: string }[];
}

export interface CPU {
  id:           string;
  name:         string;
  brand:        "intel" | "amd" | "apple";
  series:       string;
  generation?:  string;
  cores:        number;
  threads:      number;
  baseClock:    number;   // GHz
  boostClock:   number;   // GHz
  tdp:          number;   // W
  score:        number;   // ベンチスコア（相対値）
  price?:       number;   // CPUのみ価格
  useCase:      string;
  tier:         "budget" | "mid" | "high" | "flagship";
}

export interface GPU {
  id:           string;
  name:         string;
  brand:        "nvidia" | "amd";
  series:       string;
  vram:         number;    // GB
  tdp:          number;    // W
  score:        number;    // 性能スコア（相対）
  price:        number;    // JPY
  fhd144fps?:   boolean;
  qhd60fps?:    boolean;
  uhd60fps?:    boolean;
  tier:         "budget" | "mid" | "high" | "flagship";
  useCase:      string;
}

export interface Category {
  id:       string;
  name:     string;
  icon:     string;
  desc:     string;
  tags:     string[];
  minPrice?: number;
  maxPrice?: number;
}

export interface DiagnosisAnswers {
  purpose:    "gaming" | "work" | "study" | "creative" | "general";
  gamingLevel?: "light" | "mid" | "heavy" | "competitive";
  formFactor: "laptop" | "desktop" | "both";
  budget:     number;    // 上限 JPY
  portability?: "priority" | "normal" | "none";
}
