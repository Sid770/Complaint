import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [],
  template: `
    <span 
      [class]="'status-badge status-' + status().toLowerCase().replace(' ', '-')"
    >
      {{ status() }}
    </span>
  `,
  styles: [`
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-open {
      background-color: #FEF3C7;
      color: #92400E;
    }

    .status-in-progress {
      background-color: #DBEAFE;
      color: #1E40AF;
    }

    .status-resolved {
      background-color: #D1FAE5;
      color: #065F46;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBadgeComponent {
  status = input.required<string>();
}
