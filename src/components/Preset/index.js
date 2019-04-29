import React from 'react'
import {Page} from '../shared'
import AddFavorite from "./components/AddFavorite"
import {Grid, Typography} from '@material-ui/core'
import {useTranslation} from 'react-i18next'

// type is the type of dropdown, list is the list of choices you have the option to choice among to set the favorites, numberOfChoices is how many favorites per type you allow to user to set
export const favorites = [
  {
    type: "activity",
    numberOfChoices: 3
  },
  {
    type: "species",
    numberOfChoices: 2
  },
  {
    type: "ZO",
    numberOfChoices: 2
  },
  {
    type: "fishingPermit",
    numberOfChoices: 2
  },
  {
    type: "ports",
    numberOfChoices: 2
  },
  {
    type: "fishingGear",
    numberOfChoices: 2
  }
]

// Will map over the list favorites and make a select for every object
export const Preset = () => {
  const [t] = useTranslation("preset")
  return(
    <Page namespace="preset" subtitle={t("titles.subtitle")}>
      <Grid alignItems="center" container direction="column" style={{margin: "32px 0 92px"}}>
        {favorites.map(favorite =>
          <Grid item key={favorite.type}>
            <AddFavorite {...favorite}/>
          </Grid>
        )}
      </Grid>
    </Page>
  )
}


export default Preset