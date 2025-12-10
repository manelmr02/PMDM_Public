import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface Upgrade {
  id: string;
  name: string;
  icon: string;
  baseCost: number;
  currentCost: number;
  production: number;
  owned: number;
  costMultiplier: number;
  description: string;
}

interface ClickUpgrade {
  id: string;
  name: string;
  icon: string;
  baseCost: number;
  currentCost: number;
  clickBonus: number;
  owned: number;
  costMultiplier: number;
  description: string;
}

interface TempBonus {
  id: number;
  x: number;
  y: number;
  type: 'double' | 'triple' | 'golden';
  icon: string;
}

@Component({
  selector: 'app-clicker',
  imports: [CommonModule],
  templateUrl: './clicker.html',
  styleUrl: './clicker.css'
})
export class Clicker implements OnInit, OnDestroy {
  // Contadores principales
  coins: number = 0;
  totalCoinsEarned: number = 0;
  coinsPerSecond: number = 0;
  coinsPerClick: number = 1;

  // Bonus temporal
  tempMultiplier: number = 1;
  tempBonusActive: boolean = false;
  tempBonusTimeLeft: number = 0;
  tempBonuses: TempBonus[] = [];

  // Animación del click
  clickAnimations: { id: number; x: number; y: number; value: number }[] = [];
  private animationId: number = 0;

  // Subscripciones
  private gameLoopSub!: Subscription;
  private bonusSpawnSub!: Subscription;
  private tempBonusTimerSub!: Subscription;

  // Mejoras de producción
  productionUpgrades: Upgrade[] = [
    {
      id: 'cursor', name: 'Cursor Automático', icon: '👆',
      baseCost: 15, currentCost: 15, production: 0.1, owned: 0,
      costMultiplier: 1.15, description: 'Hace click automáticamente'
    },
    {
      id: 'grandma', name: 'Abuelita', icon: '👵',
      baseCost: 100, currentCost: 100, production: 1, owned: 0,
      costMultiplier: 1.15, description: 'Una dulce abuelita que hornea monedas'
    },
    {
      id: 'farm', name: 'Granja', icon: '🌾',
      baseCost: 1100, currentCost: 1100, production: 8, owned: 0,
      costMultiplier: 1.15, description: 'Cultiva monedas doradas'
    },
    {
      id: 'mine', name: 'Mina', icon: '⛏️',
      baseCost: 12000, currentCost: 12000, production: 47, owned: 0,
      costMultiplier: 1.15, description: 'Extrae monedas de las profundidades'
    },
    {
      id: 'factory', name: 'Fábrica', icon: '🏭',
      baseCost: 130000, currentCost: 130000, production: 260, owned: 0,
      costMultiplier: 1.15, description: 'Produce monedas en masa'
    },
    {
      id: 'bank', name: 'Banco', icon: '🏦',
      baseCost: 1400000, currentCost: 1400000, production: 1400, owned: 0,
      costMultiplier: 1.15, description: 'Genera intereses en monedas'
    },
    {
      id: 'temple', name: 'Templo', icon: '🛕',
      baseCost: 20000000, currentCost: 20000000, production: 7800, owned: 0,
      costMultiplier: 1.15, description: 'Los antiguos dioses bendicen tus monedas'
    },
    {
      id: 'wizard', name: 'Torre de Magos', icon: '🧙',
      baseCost: 330000000, currentCost: 330000000, production: 44000, owned: 0,
      costMultiplier: 1.15, description: 'Conjura monedas de la nada'
    },
    {
      id: 'portal', name: 'Portal', icon: '🌀',
      baseCost: 5100000000, currentCost: 5100000000, production: 260000, owned: 0,
      costMultiplier: 1.15, description: 'Trae monedas de otras dimensiones'
    },
    {
      id: 'timemachine', name: 'Máquina del Tiempo', icon: '⏰',
      baseCost: 75000000000, currentCost: 75000000000, production: 1600000, owned: 0,
      costMultiplier: 1.15, description: 'Trae monedas del pasado'
    }
  ];

  // Mejoras de click
  clickUpgrades: ClickUpgrade[] = [
    {
      id: 'finger', name: 'Dedo de Hierro', icon: '🦾',
      baseCost: 100, currentCost: 100, clickBonus: 1, owned: 0,
      costMultiplier: 1.5, description: '+1 moneda por click'
    },
    {
      id: 'glove', name: 'Guante Dorado', icon: '🧤',
      baseCost: 500, currentCost: 500, clickBonus: 5, owned: 0,
      costMultiplier: 1.5, description: '+5 monedas por click'
    },
    {
      id: 'hammer', name: 'Martillo de Oro', icon: '🔨',
      baseCost: 5000, currentCost: 5000, clickBonus: 25, owned: 0,
      costMultiplier: 1.5, description: '+25 monedas por click'
    },
    {
      id: 'lightning', name: 'Toque Eléctrico', icon: '⚡',
      baseCost: 50000, currentCost: 50000, clickBonus: 100, owned: 0,
      costMultiplier: 1.5, description: '+100 monedas por click'
    },
    {
      id: 'laser', name: 'Dedo Láser', icon: '🔴',
      baseCost: 500000, currentCost: 500000, clickBonus: 500, owned: 0,
      costMultiplier: 1.5, description: '+500 monedas por click'
    },
    {
      id: 'quantum', name: 'Click Cuántico', icon: '🔮',
      baseCost: 5000000, currentCost: 5000000, clickBonus: 2500, owned: 0,
      costMultiplier: 1.5, description: '+2500 monedas por click'
    }
  ];

  ngOnInit(): void {
    this.loadGame();
    this.startGameLoop();
    this.startBonusSpawner();
  }

  ngOnDestroy(): void {
    this.saveGame();
    this.gameLoopSub?.unsubscribe();
    this.bonusSpawnSub?.unsubscribe();
    this.tempBonusTimerSub?.unsubscribe();
  }

  // Game loop principal - solo se ejecuta cuando la app está activa
  startGameLoop(): void {
    this.gameLoopSub = interval(100).subscribe(() => {
      const earnings = (this.coinsPerSecond / 10) * this.tempMultiplier;
      this.coins += earnings;
      this.totalCoinsEarned += earnings;
    });
  }

  // Spawner de bonus temporales
  startBonusSpawner(): void {
    this.bonusSpawnSub = interval(15000 + Math.random() * 15000).subscribe(() => {
      this.spawnTempBonus();
    });
  }

  spawnTempBonus(): void {
    const types: ('double' | 'triple' | 'golden')[] = ['double', 'triple', 'golden'];
    const icons: Record<string, string> = { double: '⭐', triple: '🌟', golden: '💫' };
    const type = types[Math.floor(Math.random() * types.length)];

    const bonus: TempBonus = {
      id: Date.now(),
      x: 10 + Math.random() * 70,
      y: 10 + Math.random() * 70,
      type,
      icon: icons[type]
    };

    this.tempBonuses.push(bonus);

    // El bonus desaparece después de 10 segundos si no se clickea
    setTimeout(() => {
      this.tempBonuses = this.tempBonuses.filter(b => b.id !== bonus.id);
    }, 10000);
  }

  collectTempBonus(bonus: TempBonus): void {
    this.tempBonuses = this.tempBonuses.filter(b => b.id !== bonus.id);

    const multipliers: Record<string, number> = { double: 2, triple: 3, golden: 7 };
    const durations: Record<string, number> = { double: 30, triple: 20, golden: 10 };

    this.tempMultiplier = multipliers[bonus.type];
    this.tempBonusTimeLeft = durations[bonus.type];
    this.tempBonusActive = true;

    this.tempBonusTimerSub?.unsubscribe();
    this.tempBonusTimerSub = interval(1000).subscribe(() => {
      this.tempBonusTimeLeft--;
      if (this.tempBonusTimeLeft <= 0) {
        this.tempMultiplier = 1;
        this.tempBonusActive = false;
        this.tempBonusTimerSub.unsubscribe();
      }
    });
  }

  // Click en la moneda principal
  onCoinClick(event: MouseEvent): void {
    const earned = this.coinsPerClick * this.tempMultiplier;
    this.coins += earned;
    this.totalCoinsEarned += earned;

    // Animación del click
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.clickAnimations.push({
      id: this.animationId++,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      value: earned
    });

    setTimeout(() => {
      this.clickAnimations.shift();
    }, 1000);
  }

  // Comprar mejora de producción
  buyProductionUpgrade(upgrade: Upgrade): void {
    if (this.coins >= upgrade.currentCost) {
      this.coins -= upgrade.currentCost;
      upgrade.owned++;
      upgrade.currentCost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned));
      this.calculateCoinsPerSecond();
    }
  }

  // Comprar mejora de click
  buyClickUpgrade(upgrade: ClickUpgrade): void {
    if (this.coins >= upgrade.currentCost) {
      this.coins -= upgrade.currentCost;
      upgrade.owned++;
      upgrade.currentCost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned));
      this.calculateCoinsPerClick();
    }
  }

  calculateCoinsPerSecond(): void {
    this.coinsPerSecond = this.productionUpgrades.reduce(
      (total, u) => total + u.production * u.owned, 0
    );
  }

  calculateCoinsPerClick(): void {
    this.coinsPerClick = 1 + this.clickUpgrades.reduce(
      (total, u) => total + u.clickBonus * u.owned, 0
    );
  }

  // Formatear números
  formatNumber(num: number): string {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return Math.floor(num).toLocaleString('es-ES');
    if (num < 1000000000) return (num / 1000000).toFixed(3).replace('.', ',') + ' millones';
    if (num < 1000000000000) return (num / 1000000000).toFixed(3).replace('.', ',') + ' billones';
    if (num < 1000000000000000) return (num / 1000000000000).toFixed(3).replace('.', ',') + ' trillones';
    return (num / 1000000000000000).toFixed(3).replace('.', ',') + ' cuatrillones';
  }

  canAfford(cost: number): boolean {
    return this.coins >= cost;
  }

  // Guardar partida
  saveGame(): void {
    const saveData = {
      coins: this.coins,
      totalCoinsEarned: this.totalCoinsEarned,
      productionUpgrades: this.productionUpgrades.map(u => ({ id: u.id, owned: u.owned, currentCost: u.currentCost })),
      clickUpgrades: this.clickUpgrades.map(u => ({ id: u.id, owned: u.owned, currentCost: u.currentCost }))
    };
    localStorage.setItem('clickerSave', JSON.stringify(saveData));
  }

  // Cargar partida
  loadGame(): void {
    const saved = localStorage.getItem('clickerSave');
    if (saved) {
      const data = JSON.parse(saved);
      this.coins = data.coins || 0;
      this.totalCoinsEarned = data.totalCoinsEarned || 0;

      data.productionUpgrades?.forEach((s: any) => {
        const u = this.productionUpgrades.find(up => up.id === s.id);
        if (u) { u.owned = s.owned; u.currentCost = s.currentCost; }
      });

      data.clickUpgrades?.forEach((s: any) => {
        const u = this.clickUpgrades.find(up => up.id === s.id);
        if (u) { u.owned = s.owned; u.currentCost = s.currentCost; }
      });

      this.calculateCoinsPerSecond();
      this.calculateCoinsPerClick();
    }
  }

  // Reiniciar partida
  resetGame(): void {
    if (confirm('¿Seguro que quieres reiniciar? Perderás todo tu progreso.')) {
      localStorage.removeItem('clickerSave');
      this.coins = 0;
      this.totalCoinsEarned = 0;
      this.coinsPerSecond = 0;
      this.coinsPerClick = 1;
      this.tempMultiplier = 1;
      this.tempBonusActive = false;

      this.productionUpgrades.forEach(u => {
        u.owned = 0;
        u.currentCost = u.baseCost;
      });

      this.clickUpgrades.forEach(u => {
        u.owned = 0;
        u.currentCost = u.baseCost;
      });
    }
  }

  // Auto-guardado cada 30 segundos
  private autoSaveInterval = setInterval(() => this.saveGame(), 30000);
}