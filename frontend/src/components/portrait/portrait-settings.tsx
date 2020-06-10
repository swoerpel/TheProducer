import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'portrait-settings',
  styleUrl: 'portrait-settings.css',
  shadow: true
})

export class PortraitSettings {
  selectedReceiverIds = [102, 103];
  @State() value: string;
  @State() selectValue: string;
  @State() secondSelectValue: string;
  @State() avOptions: any[] = [
    { 'id': 101, 'name': 'Mark' },
    { 'id': 102, 'name': 'Smith' }
  ];
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.value);
  }

  handleChange(event) {
    this.value = event.target.value;

    if (event.target.validity.typeMismatch) {
      console.log('this element is not valid')
    }
  }

  handleSelect(event) {
    console.log(event.target.value);
    this.selectValue = event.target.value;
  }

  handleSecondSelect(event) {
    console.log(event.target.value);
    this.secondSelectValue = event.target.value;
  }
  render() {
    return (
      <div class='portrait-settings'>
        <div class='portrait-settings-header'>
          <h2>Image Settings</h2>
        </div>
        <div class='portrait-settings-body'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Email:
            <input type="email" value={this.value} onInput={(e) => this.handleChange(e)} />
          </label>

          <select onInput={(event) => this.handleSelect(event)}>
            <option value="volvo" selected={this.selectValue === 'volvo'}>Volvo</option>
            <option value="saab" selected={this.selectValue === 'saab'}>Saab</option>
            <option value="mercedes" selected={this.selectValue === 'mercedes'}>Mercedes</option>
            <option value="audi" selected={this.selectValue === 'audi'}>Audi</option>
          </select>

          <select onInput={(event) => this.handleSecondSelect(event)}>
            {this.avOptions.map(recipient => (
              <option value={recipient.id} selected={this.selectedReceiverIds.indexOf(recipient.id) !== -1}>{recipient.name}</option>
            ))}
          </select>

          <input type="submit" value="Submit" />
        </form>
        </div>
      </div>
    );
  }
}

