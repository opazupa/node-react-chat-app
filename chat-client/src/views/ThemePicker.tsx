import { Button, Color, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ColorResult, GithubPicker } from 'react-color';

import { Emoji } from '../common/utils';
import { IThemeStore } from '../stores';

interface IThemePickerProps {
  themeStore?: IThemeStore;
}

const { common, ...THEME_COLORS } = colors;

@inject('themeStore')
@observer
class ThemePicker extends React.Component<IThemePickerProps, {}> {
  private themeColorMap: { [Key: string]: Color };
  private colorSelection: string[];

  constructor(props, context) {
    super(props, context);
    this.themeColorMap = Object(THEME_COLORS);
    this.colorSelection = Object.keys(this.themeColorMap).map(key => this.themeColorMap[key][500]);
  }

  public render() {
    const { themeStore } = this.props;

    return (
      <Grid container spacing={8} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" style={{ marginBottom: '10px' }}>
            Customize
            <Emoji symbol="🎨" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch checked={this.isDarkTheme()} onClick={this.handleTypeSwitch()} color="primary" />}
            label={this.isDarkTheme() ? 'Dark' : 'Light'}
          />
          <Button color="secondary" variant="outlined" onClick={() => themeStore!.reset()}>
            Reset theme
          </Button>
        </Grid>
        <Grid container spacing={8} justify="center" wrap="wrap">
          <Grid item>
            <Typography>Primary color</Typography>
            <GithubPicker
              color={this.convertColorToHex(themeStore!.theme.colors.primary)}
              colors={this.colorSelection}
              onChange={(color: ColorResult) => themeStore!.setPrimaryColor(this.convertHexToColor(color.hex))}
              triangle="hide"
            />
          </Grid>
          <Grid item>
            <Typography>Secondary color</Typography>
            <GithubPicker
              color={this.convertColorToHex(themeStore!.theme.colors.secondary)}
              colors={this.colorSelection}
              onChange={(color: ColorResult) => themeStore!.setSecondaryColor(this.convertHexToColor(color.hex))}
              triangle="hide"
            />
          </Grid>
          <Grid item>
            <Typography>Error color</Typography>
            <GithubPicker
              color={this.convertColorToHex(themeStore!.theme.colors.error)}
              colors={this.colorSelection}
              onChange={(color: ColorResult) => themeStore!.setErrorColor(this.convertHexToColor(color.hex))}
              triangle="hide"
            />
          </Grid>
          <Grid item>
            <Typography>Highlight color</Typography>
            <GithubPicker
              color={themeStore!.highlightColor}
              colors={this.colorSelection}
              onChange={(color: ColorResult) => themeStore!.setHighlightColor(this.convertHexToColor(color.hex))}
              triangle="hide"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  private convertColorToHex = (color: Color): string => color[500];

  private convertHexToColor = (hex: string): Color => {
    const colorKey = Object.keys(this.themeColorMap).filter(key => this.themeColorMap[key][500] === hex)[0];
    return this.themeColorMap[colorKey];
  };

  private handleTypeSwitch = () => event => {
    const type = event.target.checked ? 'dark' : 'light';
    this.props.themeStore!.setType(type);
  };

  private isDarkTheme(): boolean {
    return this.props.themeStore!.theme.colors.type === 'dark';
  }
}

export default ThemePicker;
