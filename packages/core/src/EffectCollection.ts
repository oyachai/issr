import { Effect, Statuses } from './Effect';

export default class EffectCollection {
  private effects: Map<string, Effect>;

  constructor() {
    this.effects = new Map();
  }

  addEffect = (effect: Effect): void => {
    if (effect instanceof Effect) {
      this.effects.set(effect.getId(), effect);
    }
  };

  hasEffect = (effectId: string): boolean => Boolean(this.effects.get(effectId));

  getEffects = (): Effect[] => Array.from(this.effects.values());

  getEffect = (effectId: string): Effect | undefined => this.effects.get(effectId);

  getWaited = (): Effect[] => {
    const effects = this.getEffects();
    return effects.filter(effect => effect.getStatus() === Statuses.wait);
  };

  runEffects = async (): Promise<void> => {
    const waited = this.getWaited();

    if (waited.length > 0) {
      const results = await Promise.allSettled(waited.map(effect => effect.getCallback()));

      results.forEach((result, num) => {
        const effect = waited[num];
        if (result.status === 'fulfilled') {
          effect.done();
        }
        if (result.status === 'rejected') {
          effect.failed();
        }
      });
    }
  };
}
