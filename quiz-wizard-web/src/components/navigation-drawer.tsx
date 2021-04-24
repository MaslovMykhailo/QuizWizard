import {PropsWithChildren, ElementType, ReactNode} from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {makeStyles, useTheme} from '@material-ui/core/styles'

import {useOpenState} from '../hooks'

export type NavigationTarget = {
  path: string
  caption: string,
  Icon: ElementType<unknown>
}

export type NavigationDrawerProps = PropsWithChildren<{
  topNavigationTargets: NavigationTarget[]
  bottomNavigationTargets?: NavigationTarget[]
  isTargetSelected?: (path: string) => boolean
  onNavigate: (path: string) => void
  toolbar: ReactNode
}>

export function NavigationDrawer({
  topNavigationTargets,
  bottomNavigationTargets,
  isTargetSelected,
  onNavigate,
  toolbar,
  children
}: NavigationDrawerProps) {
  const theme = useTheme()
  const classes = useStyles()

  const {isOpen, isClose, open, close} = useOpenState()

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar, {
            [classes.appBarShift]: isOpen
          })
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open}
            edge="start"
            className={clsx(
              classes.menuButton, {
                [classes.hide]: isOpen
              })}
          >
            <MenuIcon />
          </IconButton>
          {toolbar}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(
          classes.drawer, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: isClose
          })
        }
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: isClose
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={close}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {topNavigationTargets.map(({path, caption, Icon}) => (
            <ListItem
              button
              key={path}
              className={classes.listItem}
              onClick={() => onNavigate(path)}
              selected={isTargetSelected?.(path)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={caption} />
            </ListItem>
          ))}
        </List>
        {bottomNavigationTargets && (
          <>
            <Divider className={classes.divider} />
            {bottomNavigationTargets.map(({path, caption, Icon}) => (
              <ListItem
                button
                key={path}
                className={classes.listItem}
                onClick={() => onNavigate(path)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={caption} />
              </ListItem>
            ))}
          </>
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

const useStyles = makeStyles((theme) => {
  const drawerWidth = theme.spacing(30)
  return {
    root: {
      display: 'flex',
      height: '100%'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(4)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      overflowX: 'hidden',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      overflowX: 'hidden',
      width: theme.spacing(9) + 1,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column'
    },
    listItem: {
      paddingLeft: theme.spacing(3)
    },
    divider: {
      marginTop: 'auto'
    }
  }
})
