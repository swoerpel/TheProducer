import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true
})
export class AppProfile {
  @Prop() match: MatchResults;

  render() {
    if (this.match && this.match.params.name) {
      return (
        <div class="app-profile">
          <stencil-route-link url='/profile'>
            <button>
              Home
            </button>
          </stencil-route-link>
        </div>
      );
    }
  }
}
