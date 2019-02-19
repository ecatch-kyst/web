/*implement the Editing page*/
/*Link 'sumbit' to send to firebase and to send you back to /messages*/

function Edit({match: {params:{type}}}){

}
return(
  <Card>
    <CardActionArea>
      <CardContent>
        <Typography variant="h5">
            RN:{RN}
        </Typography>
        <Typography>{t("titles.message-type")}: {TM}</Typography>
        <Typography>Status: {status}</Typography>
        <Typography>{t("titles.time-sent")}: {timeSent}</Typography> have a check if 12 hours have passed, choose icon based on this.
        <Button>
          <EditIcon/>
        </Button>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button>
        Submit
      </Button>
      <Button>
        Cancel
      </Button>
    </CardActions>
  </Card>)