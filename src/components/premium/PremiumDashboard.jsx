import ARHUD from './ARHUD'
import PredictiveAlerts from './PredictiveAlerts'
import CommunityFeed from './CommunityFeed'
import OBDPanel from './OBDPanel'
import CustomizationPanel from './CustomizationPanel'
import EcoAnalytics from './EcoAnalytics'
import VoiceGestureControl from './VoiceGestureControl'
import SmartwatchModule from './SmartwatchModule'
import CloudSync from './CloudSync'
import Leaderboard from './Leaderboard'
import PrioritySupport from './PrioritySupport'

export default function PremiumDashboard() {
  return (
    <div className="space-y-4 max-w-sm mx-auto p-2">
      <h1 className="text-xl font-bold">Premium Dashboard</h1>
      <CustomizationPanel />
      <ARHUD />
      <PredictiveAlerts />
      <CommunityFeed />
      <OBDPanel />
      <EcoAnalytics />
      <VoiceGestureControl />
      <SmartwatchModule />
      <CloudSync />
      <Leaderboard />
      <PrioritySupport />
    </div>
  )
}
